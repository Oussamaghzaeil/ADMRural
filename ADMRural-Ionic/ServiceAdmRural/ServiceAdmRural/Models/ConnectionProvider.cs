using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Data.Odbc;

namespace ServiceAdmRural.Models
{
    public class ConnectionProvider
    {
        public SqlConnection myConnection = new SqlConnection();

        public String chavecriptografia = "undercode2018";

        public ConnectionProvider()
        {
           //this.myConnection.ConnectionString = "Data Source=ECS-C028\\SQLEXPRESS;Initial Catalog=ecupom;Integrated Security=False;User Id=ecupom;Password=ecupom;Connection Timeout=30000;";
            this.myConnection.ConnectionString = "Data Source=200.196.251.212, 1433;Initial Catalog=admrural;Integrated Security=False;User Id=admrural;Password=admrural;Connection Timeout=30000;";
        }

    }
}
