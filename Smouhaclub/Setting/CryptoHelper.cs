using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
public class CryptoHelper
{

    // Decrypt a byte array into a byte array using a key and an IV 
    public static byte[] Decrypt(byte[] cipherData, byte[] Key, byte[] IV)
    {

        // Create a MemoryStream that is going to accept the
        // decrypted bytes 

        MemoryStream ms = new MemoryStream();

        // Create a symmetric algorithm. 
        // We are going to use Rijndael because it is strong and
        // available on all platforms. 
        // You can use other algorithms, to do so substitute the next
        // line with something like 
        //     TripleDES alg = TripleDES.Create(); 

        Rijndael alg = Rijndael.Create();

        // Now set the key and the IV. 
        // We need the IV (Initialization Vector) because the algorithm
        // is operating in its default 
        // mode called CBC (Cipher Block Chaining). The IV is XORed with
        // the first block (8 byte) 
        // of the data after it is decrypted, and then each decrypted
        // block is XORed with the previous 
        // cipher block. This is done to make encryption more secure. 
        // There is also a mode called ECB which does not need an IV,
        // but it is much less secure. 

        alg.Key = Key;
        alg.IV = IV;
        //alg.Mode = CipherMode.CBC;
        // Create a CryptoStream through which we are going to be
        // pumping our data. 
        // CryptoStreamMode.Write means that we are going to be
        // writing data to the stream 
        // and the output will be written in the MemoryStream
        // we have provided. 

        CryptoStream cs = new CryptoStream(ms,
            alg.CreateDecryptor(), CryptoStreamMode.Write);

        // Write the data and make it do the decryption 
        cs.Write(cipherData, 0, cipherData.Length);

        // Close the crypto stream (or do FlushFinalBlock). 
        // This will tell it that we have done our decryption
        // and there is no more data coming in, 
        // and it is now a good time to remove the padding
        // and finalize the decryption process. 

        cs.Close();

        // Now get the decrypted data from the MemoryStream. 
        // Some people make a mistake of using GetBuffer() here,
        // which is not the right way. 

        byte[] decryptedData = ms.ToArray();
        return decryptedData;
    }

    // Decrypt a string into a string using a password 
    //    Uses Decrypt(byte[], byte[], byte[]) 
    public static string Decrypt(string cipherText, string Password)
    {

        // First we need to turn the input string into a byte array. 
        // We presume that Base64 encoding was used 

        byte[] cipherBytes = Convert.FromBase64String(cipherText);

        // Then, we need to turn the password into Key and IV 
        // We are using salt to make it harder to guess our key
        // using a dictionary attack - 
        // trying to guess a password by enumerating all possible words. 

        PasswordDeriveBytes pdb = new PasswordDeriveBytes(Password,
            new byte[] {0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65,
            0x64, 0x76, 0x65, 0x64, 0x65, 0x76});

        // Now get the key/IV and do the decryption using
        // the function that accepts byte arrays. 
        // Using PasswordDeriveBytes object we are first
        // getting 32 bytes for the Key 
        // (the default Rijndael key length is 256bit = 32bytes)
        // and then 16 bytes for the IV. 
        // IV should always be the block size, which is by
        // default 16 bytes (128 bit) for Rijndael. 
        // If you are using DES/TripleDES/RC2 the block size is
        // 8 bytes and so should be the IV size. 
        // You can also read KeySize/BlockSize properties off
        // the algorithm to find out the sizes. 

        byte[] decryptedData = Decrypt(cipherBytes,
            pdb.GetBytes(32), pdb.GetBytes(16));

        // Now we need to turn the resulting byte array into a string. 
        // A common mistake would be to use an Encoding class for that.
        // It does not work 
        // because not all byte values can be represented by characters. 
        // We are going to be using Base64 encoding that is 
        // designed exactly for what we are trying to do. 

        return System.Text.Encoding.Unicode.GetString(decryptedData);
    }
































    public static string Encrypt(string data, string key)
    {
        string encData = null;
        byte[][] keys = GetHashKeys(key);

        try
        {
            encData = EncryptStringToBytes_Aes(data, keys[0], keys[1]);
        }
        catch (CryptographicException) { }
        catch (ArgumentNullException) { }

        return ConvertStringToHex(encData);
    }

    public static string Decrypt(string data)
    {
        data = ConvertHexToString(data);
        string decData = null;
        byte[][] keys = GetHashKeys(SettingHelper.GetKey());

        try
        {
            decData = DecryptStringFromBytes_Aes(data, keys[0], keys[1]);
        }
        catch (CryptographicException) { }
        catch (ArgumentNullException) { }

        return decData;
    }

    private static byte[][] GetHashKeys(string key)
    {
        byte[][] result = new byte[2][];
        Encoding enc = Encoding.UTF8;

        SHA256 sha2 = new SHA256CryptoServiceProvider();

        byte[] rawKey = enc.GetBytes(key);
        byte[] rawIV = enc.GetBytes(key);

        byte[] hashKey = sha2.ComputeHash(rawKey);
        byte[] hashIV = sha2.ComputeHash(rawIV);

        Array.Resize(ref hashIV, 16);

        result[0] = hashKey;
        result[1] = hashIV;

        return result;
    }

    private static string EncryptStringToBytes_Aes(string plainText, byte[] Key, byte[] IV)
    {
        if (plainText == null || plainText.Length <= 0)
            throw new ArgumentNullException("plainText");
        if (Key == null || Key.Length <= 0)
            throw new ArgumentNullException("Key");
        if (IV == null || IV.Length <= 0)
            throw new ArgumentNullException("IV");

        byte[] encrypted;

        using (AesManaged aesAlg = new AesManaged())
        {
            aesAlg.Key = Key;
            aesAlg.IV = IV;

            ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

            using (MemoryStream msEncrypt = new MemoryStream())
            {
                using (CryptoStream csEncrypt =
                        new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                {
                    using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                    {
                        swEncrypt.Write(plainText);
                    }
                    encrypted = msEncrypt.ToArray();
                }
            }
        }
        return Convert.ToBase64String(encrypted);
    }

    private static string DecryptStringFromBytes_Aes(string cipherTextString, byte[] Key, byte[] IV)
    {
        byte[] cipherText = Convert.FromBase64String(cipherTextString);

        if (cipherText == null || cipherText.Length <= 0)
            throw new ArgumentNullException("cipherText");
        if (Key == null || Key.Length <= 0)
            throw new ArgumentNullException("Key");
        if (IV == null || IV.Length <= 0)
            throw new ArgumentNullException("IV");

        string plaintext = null;

        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = Key;
            aesAlg.IV = IV;

            ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

            using (MemoryStream msDecrypt = new MemoryStream(cipherText))
            {
                using (CryptoStream csDecrypt =
                        new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                {
                    using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                    {
                        plaintext = srDecrypt.ReadToEnd();
                    }
                }
            }
        }
        return plaintext;
    }
    public static string ConvertStringToHex(string input)
    {
        try
        {
            var bytes = Convert.FromBase64String(input);
            var hex = BitConverter.ToString(bytes);
            return hex.Replace("-", "").ToLower();
        }
        catch (Exception)
        {
            return "-1";
        }


        //Byte[] stringBytes = Encoding.Default.GetBytes(input);
        //StringBuilder sbBytes = new StringBuilder(stringBytes.Length * 2);
        //foreach (byte b in stringBytes)
        //{
        //    sbBytes.AppendFormat("{0:X2}", b);
        //}
        //return sbBytes.ToString();
    }

    //public static string ConvertHexToString(string hexInput)
    //{
    //    int numberChars = hexInput.Length;
    //    byte[] bytes = new byte[numberChars / 2];
    //    for (int i = 0; i < numberChars; i += 2)
    //    {
    //        bytes[i / 2] = Convert.ToByte(hexInput.Substring(i, 2), 16);
    //    }
    //    return Encoding.Default.GetString(bytes);
    //}


    public static string ConvertHexToString(string hexInput)
    {
        try
        {
            var bytes = new byte[hexInput.Length / 2];
            for (var i = 0; i < bytes.Length; i++)
            {
                bytes[i] = Convert.ToByte(hexInput.Substring(i * 2, 2), 16);
            }
            return Convert.ToBase64String(bytes);
        }
        catch (Exception)
        {
            return "-1";
        }


    }


    public static string ReverseString(string s)
    {
        char[] arr = s.ToCharArray();
        Array.Reverse(arr);
        return new string(arr);
    }

    public static string Base64ToHex(string strInput)
    {
        try
        {
            var bytes = Convert.FromBase64String(strInput);
            var hex = BitConverter.ToString(bytes);
            return hex.Replace("-", "").ToLower();
        }
        catch (Exception)
        {
            return "-1";
        }
    }
    public static string HexToBase64(string strInput)
    {
        try
        {
            var bytes = new byte[strInput.Length / 2];
            for (var i = 0; i < bytes.Length; i++)
            {
                bytes[i] = Convert.ToByte(strInput.Substring(i * 2, 2), 16);
            }
            return Convert.ToBase64String(bytes);
        }
        catch (Exception)
        {
            return "-1";
        }
    }
}