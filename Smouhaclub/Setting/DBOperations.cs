using Microsoft.Data.SqlClient;
using System.Data;

public static class DBOperations
{



    public static DataSet GetALLMenus()
    {
        SqlConnection SqlCon = new SqlConnection(SettingHelper.GetConnectionString());
        SqlCommand SqlCmd = new SqlCommand("usp_GetALLMenus", SqlCon);
        SqlCmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter SqlDat = new SqlDataAdapter(SqlCmd);
        DataSet ds = new DataSet();
        SqlCon.Open();
        SqlDat.Fill(ds);
        SqlCon.Close();
        return ds;
    }


    public static void HandelAQF()
    {
        try
        {
            SqlConnection SqlCon = new SqlConnection(SettingHelper.GetConnectionString());
            SqlCommand SqlCmd = new SqlCommand("usp_HandelAQF", SqlCon);
            SqlCmd.CommandType = CommandType.StoredProcedure;
            //SqlDataAdapter SqlDat = new SqlDataAdapter(SqlCmd);
            SqlCon.Open();
            SqlCon.Close();
        }
        catch (Exception ex)
        {

            throw;
        }
        
    }




}
