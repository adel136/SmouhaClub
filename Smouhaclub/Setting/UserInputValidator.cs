using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
public class UserInputValidator
{
    public static bool IsValidEmail(string email)
    {
        if (string.IsNullOrEmpty(email))
            return false;

        // Regular expression pattern for validating email addresses
        string pattern = @"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$";
        return Regex.IsMatch(email, pattern);
    }

    public static bool IsValidPhoneNumber(string phoneNumber)
    {
        if (string.IsNullOrEmpty(phoneNumber))
            return false;

        // Regular expression pattern for validating phone numbers (numbers only)
        string pattern = @"^[0-9]+$";
        return Regex.IsMatch(phoneNumber, pattern);
    }

    public static bool IsValidNationalID(string nationalId)
    {
        if (string.IsNullOrEmpty(nationalId))
            return false;

        // Regular expression pattern for validating national Id (numbers only)
        string pattern = @"^[0-9]+$";
        return Regex.IsMatch(nationalId, pattern);
    }
}

