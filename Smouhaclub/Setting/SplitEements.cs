using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
public class SplitEements
{
    public static string Split(string value, int firstWordsCount = 30)
    {
        if (value == null)
        {
            return "";
        }
        else
        {
            if (value.Split(" ").Count() <= firstWordsCount)
            {
                return value;
            }
            else
            {
                IEnumerable<string> words = value.Trim().Split(" ").Take(firstWordsCount);
                StringBuilder firstwords = new StringBuilder();
                foreach (string s in words)
                {
                    firstwords.Append(s + " ");
                }
                //if (firstWordsCount == 30)
                //{
                //    //firstwords.Append("...");
                //}
                return firstwords.ToString();
            }
        }
    }
    public static string Skip(string value, int firstSkipCount)
    {
        IEnumerable<string> words = value.Split().Skip(firstSkipCount);
        StringBuilder firstwords = new StringBuilder();
        foreach (string s in words)
        {
            firstwords.Append(s + " ");
        }
        return firstwords.ToString();
    }
}

