using System.Dynamic;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Data;
using System.Text;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Http;
using System.Net.Mail;
using System.Text.RegularExpressions;

public static class PublicFunction
{
    public static string GetMonthName(int monthNumber, string lang = "ar")
    {
        string monthName = "";
        switch (monthNumber)
        {
            case 1:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "يناير"; }
                else
                { monthName = "January"; }
                break;
            case 2:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "فبراير"; }
                else
                { monthName = "February"; }

                break;
            case 3:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "مارس"; }
                else
                { monthName = "March"; }
                break;
            case 4:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "أبريل"; }
                else
                { monthName = "April"; }
                break;
            case 5:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "مايو"; }
                else
                { monthName = "mayo"; }
                break;
            case 6:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "يونيو"; }
                else
                { monthName = "June"; }
                break;
            case 7:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "يوليو"; }
                else
                { monthName = "July"; }
                break;
            case 8:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "اغسطس"; }
                else
                { monthName = "August"; }
                break;
            case 9:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "سبتمبر"; }
                else
                { monthName = "September"; }

                break;
            case 10:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "أكتوبر"; }
                else
                { monthName = "October"; }
                break;
            case 11:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "نوفمبر"; }
                else
                { monthName = "November"; }
                break;
            case 12:
                if (lang.Equals("ar", StringComparison.OrdinalIgnoreCase))
                { monthName = "ديسمبر"; }
                else
                { monthName = "December"; }
                break;

        }

        return monthName;

    }

    public static string GetMonthNameFromDate(DateTime date, string lang)
    {
        var monthName = GetMonthName(date.Month, lang);
        var data = string.Join(" ", date.Day, monthName, date.Year);
        return data;
    }

    public static string TagreedMethod(string str)
    {

        string[] Tagreed = new string[] { "إ", "أ", "آ", "ؤ", "ة", "ي", "ئ" };
        foreach (string c in Tagreed)
        {

            if (str.Contains(c))
            {
                if (c == "إ") { str = str.Replace(c.ToString(), "ا"); }
                else if (c == "أ") { str = str.Replace(c.ToString(), "ا"); }
                else if (c == "آ") { str = str.Replace(c.ToString(), "ا"); }
                else if (c == "ؤ") { str = str.Replace(c.ToString(), "و"); }
                else if (c == "ة") { str = str.Replace(c.ToString(), "ه"); }
                else if (c == "ي") { str = str.Replace(c.ToString(), "ى"); }
                else if (c == "ئ") { str = str.Replace(c.ToString(), "ى"); }

            }

        }

        return str;
    }
    public static string RenameFiles(string FileName)
    {
        var ext = FileName.Split('.')[1].ToLower();
        //string name = DateTime.Now.ToString("yyyyMMddHHmmss") + DateTime.Now.Millisecond + Path.GetExtension(FileName);
        string name = DateTime.Now.ToString("yyyyMMddHHmmss") + DateTime.Now.Millisecond + "." + ext;
        return name;
    }
    public static void RemoveFile(string filePath, string fileName)
    {
        if (fileName != null)
        {
            string FillPath = Path.Combine(filePath + fileName);
            if (System.IO.File.Exists(FillPath))
            {
                System.IO.File.Delete(FillPath);

            }
        }
    }
    public static string GetInitialTextPrevMinistry(int MinisterGender, int JobType)
    {
        string text = "";
        switch ((MinisterGender, JobType))
        {
            case (1, 1):
                text = "تولى منصب وزير البيئة";
                break;
            case (1, 2):
                text = "تولى منصب رئاسة الجهاز";
                break;
            case (2, 1):
                text = "تولت منصب وزيرة البيئة ";
                break;
            default:
                text = "تولت منصب رئاسة الجهاز";
                break;
        }
        return text;
    }
    public static DataTable ConvertCVSToDataTable(string filePath)
    {
        DataTable dtCSV = new DataTable();
        StreamReader reader = new StreamReader(filePath, Encoding.GetEncoding("Windows-1256"), true);
        string[] fisrtLine = reader.ReadLine().Split(',');
        foreach (string item in fisrtLine)
        {
            DataColumn datecolumn = new DataColumn(item);
            datecolumn.AllowDBNull = true;
            dtCSV.Columns.Add(datecolumn);
        }
        while (!reader.EndOfStream)
        {
            string[] line = reader.ReadLine().Split(',');
            for (int i = 0; i < line.Length; i++)
            {
                if (line[i] == "")
                {
                    line[i] = null;
                }
            }
            dtCSV.Rows.Add(line);
        }
        reader.Close();
        return dtCSV;
    }

    public static DateTime ConvertDate(DateTime? NewsDate)
    {
        var date = NewsDate.Value.Date.ToString("yyyy-MM-dd");
        return DateTime.ParseExact(date, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
    }
    public static DateTime ConvertDate(string NewsDate)
    {
        var date = DateTime.Parse(NewsDate).ToString("yyyy-MM-dd");
        return DateTime.ParseExact(date, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
    }


    public static DateTime GetCurrentDate()
    {
        var CurrentDate = DateTime.Now.ToString("yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
        return DateTime.ParseExact(CurrentDate, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
    }
    public static TimeSpan GetCurrentTime()
    {
        var CurrentDate = DateTime.Now.ToString("HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
        return TimeSpan.Parse(CurrentDate);
    }
    public static string GetImageByExtension(string extension)
    {
        string pathIamgs = "";
        switch (extension.ToLower())
        {
            case "pdf":
                pathIamgs = "/assets/images/pdf.jpg";
                break;
            case "docx":
                pathIamgs = "/assets/images/Word.png";
                break;
            default:
                pathIamgs = "/assets/images/jpg-63.png";
                break;
        }
        return pathIamgs;
    }
    public static string GetFaNameForAttachmentSetion(string extinsion)
    {
        string result = "";
        switch (extinsion)
        {
            case "pdf":
                result = "pdf";
                break;
            case "doc":
            case "docx":
                result = "word";
                break;
            case "xls":
            case "xlsx":
                result = "excell";
                break;
            case "png":
            case "jpg":
            case "jpeg":
                result = "image";
                break;
        }
        return result;
    }
    public static string GetContentType(string ext)
    {
        string result = "";
        switch (ext)
        {
            case "doc":
            case "docx":
            case "rtf":
                result = "application/msword";
                break;
            case "xls":
            case "xlsx":
                result = "application/x-msexcel";
                break;
            case "pdf":
                result = "application/pdf";
                break;
            case "jpg":
            case "jpeg":
                result = "image/jpeg";
                break;
            case "txt":
                result = "text/plain";
                break;
        }

        return result;
    }
    public static void CreateDirectory(string wwwRoot, string uploadPath)
    {
        string dir = GetDirectory(wwwRoot, uploadPath);
        if (!Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }
    }
    public static string GetDirectory(string wwwRoot, string uploadPath)
    {
        return Path.Combine(wwwRoot, uploadPath);
    }
    public static string GetPath(string wwwRoot, string uploadPath, string fileName)
    {
        return Path.Combine(wwwRoot, uploadPath, fileName);
    }
    public static string SaveFile(IFormFile formfile, string wwwRoot, string uploadPath)
    {
        string fileName = RenameFiles(formfile.FileName);
        FileStream stream = new FileStream(GetPath(wwwRoot, uploadPath, fileName), FileMode.Create);
        formfile.CopyTo(stream);
        stream.Close();
        return fileName;
    }

    public static void DeleteFile(string wwwRoot, string uploadPath, string fileName)
    {
        if (!string.IsNullOrEmpty(fileName))
        {
            string fullPath = GetPath(wwwRoot, uploadPath, fileName);
            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
        }
    }

    public static void TransferFile(string wwwRoot, string oldPath, string newPath, string fileName)
    {
        string sourceFile = GetPath(wwwRoot, oldPath, fileName);
        string destFile = GetPath(wwwRoot, newPath, fileName);
        CreateDirectory(wwwRoot, newPath);
        if (File.Exists(sourceFile))
        {
            System.IO.File.Move(sourceFile, destFile, true);
        }
    }

    public static FileStream GetFileStream(string filePath)
    {
        FileStream fileStream = new FileStream(filePath, FileMode.Open);
        return fileStream;
    }

    public static ExpandoObject ToExpando(this object anonymousObject)
    {
        IDictionary<string, object> anonymousDictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(anonymousObject);
        IDictionary<string, object> expando = new ExpandoObject();
        foreach (var item in anonymousDictionary)
            expando.Add(item);
        return (ExpandoObject)expando;
    }

    public static string GetIncomingFromInWebSites()
    {
        return "الموقع الالكتروني (web sites)";
    }



    public static string SanitizeInput(string input)
    {
        if (!string.IsNullOrEmpty(input))
        {
            input = Regex.Replace(input, @"<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>", "", RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"<[^>]+>", "", RegexOptions.IgnoreCase);
        }

        return input;
    }

    public static string EncryptAndConvertToHex(string value)
    {
        string encryptUsreId = CryptoHelper.Encrypt(value, SettingHelper.GetKey());
        string encryptHex = CryptoHelper.ConvertStringToHex(encryptUsreId);
        return encryptHex;
    }


    public static string ConvertToHexAndDecrypt(string value)
    {
        string base64columnValue = CryptoHelper.ConvertHexToString(value.ToString());
        string decriptcolumnValue = CryptoHelper.Decrypt(base64columnValue);
        return decriptcolumnValue;
    }

}

