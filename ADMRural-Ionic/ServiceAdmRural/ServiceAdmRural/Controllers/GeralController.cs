//using ServiceAdmRural.Models;


//namespace ServiceAdmRural.Controllers

using ServiceAdmRural.Models;
using System;
using System.Data;
using System.Data.SqlClient;
//using System.Data.Odbc;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Text;
//using System.Linq;
//using System.Collections.Generic;
//using System.Web.Script.Serialization;
//using System.Runtime.Serialization;
//using System.Runtime.Serialization.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using  System.Text.RegularExpressions;

namespace ServiceAdmRural.Controllers
{
    public class GeralController : ApiController
    {

        static class Constants
        {
            public const String UserImagesPath = "AdmRural";
        }
        ConnectionProvider connectp = new ConnectionProvider();

        /*  ---------------------------
        *   Converte DataJson to Table
        *   ---------------------------
        *   string json = "[{\"email\":\"gilson.delima@gmail.com\",\"password\":\"2f7b52aacfbf6f44e13d27656ecb1f59\"}]";
        *   var data = (DataTable)JsonConvert.DeserializeObject(json, (typeof(DataTable)));
        *   DataTable Dados = (DataTable)JsonConvert.DeserializeObject(strDataJson, (typeof(DataTable)));
        *  
        *   --------------------------
        *   Converte Table To DataJson
        *   --------------------------
        *   string json = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(dTable, Formatting.Indented)));
        *   table.Rows.Add(json);
        */


        // http://localhost:60313/api/AdmRural/Authentication?StoreProcName=spUsuarioAuthentication&DataJson=eyJmTmFtZSI6IiIsImxOYW1lIjoiIiwiZW1haWwiOiJnaWxzb24uZGVsaW1hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMmY3YjUyYWFjZmJmNmY0NGUxM2QyNzY1NmVjYjFmNTkifQ==
        [Route("api/AdmRural/Authentication")]
        [HttpGet]
        [ActionName("Authentication")]
        public DataTable Authentication(string StoreProcName, string DataJson)
        {
            string HashKey = null;
            string Message = null;
            Boolean Success = false;
            Boolean isTypeSQLResult;
            string DataJsonResults = null;
            string SQLString = null;


            byte[] byteDataJson = Convert.FromBase64String(DataJson);
            string strDataJson = Encoding.UTF8.GetString(byteDataJson);
            strDataJson = decripta(strDataJson);

            //Console.WriteLine(strDataJson);


            DataTable table = new DataTable();
            table.Columns.Add("hashkey", typeof(String));
            table.Columns.Add("message", typeof(String));
            table.Columns.Add("success", typeof(Boolean));
            table.Columns.Add("results", typeof(String));

            SqlCommand cmd = new SqlCommand();
            System.Data.DataSet ds = new System.Data.DataSet();
            System.Data.DataSet DataSetResult = new System.Data.DataSet();
            SqlDataReader rdr;
            try
            {
                connectp.myConnection.Open();
                System.Data.SqlClient.SqlParameter wParam1 = new System.Data.SqlClient.SqlParameter("@StringDataJson", System.Data.SqlDbType.VarChar, 255)
                {
                    Value = strDataJson
                };
                cmd.Parameters.Add(wParam1);

                cmd.Connection = connectp.myConnection;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = StoreProcName;
                rdr = cmd.ExecuteReader();
                try
                {
                    rdr.Read();
                    isTypeSQLResult = rdr.GetBoolean(0);
                    HashKey = rdr.GetString(1);
                    Message = rdr.GetString(2);
                    Success = rdr.GetBoolean(3);
                    if (isTypeSQLResult)
                    {
                        SQLString = rdr.GetString(4);
                        //connectp.myConnection.Close();
                        //connectp.myConnection.Open();

                        ConnectionProvider connectp2 = new ConnectionProvider();
                        SqlDataAdapter adapter = new SqlDataAdapter();
                        adapter.SelectCommand = new SqlCommand(SQLString, connectp2.myConnection);
                        try
                        {
                            adapter.Fill(DataSetResult);
                            try
                            {
                                DataTableCollection DC = DataSetResult.Tables;
                                DataTable dTable = DC[0];
                                DataJsonResults = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(dTable, Formatting.Indented)));

                            }
                            catch (Exception e)
                            {
                                Message = e.Message;
                                Success = false;
                            }
                        }
                        catch (Exception e)
                        {
                            Success = false;
                            Message = e.Message;
                        }
                        finally
                        {
                            connectp.myConnection.Close();
                            connectp2.myConnection.Close();
                        }
                    }
                    else
                    {
                        DataJsonResults = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(rdr.GetString(4)));
                    }
                    if (Success)
                    {
                        //envio o email com a senha cadastrada
                        // EnviarEmail(email, "cadastro", senha);
                    }
                }
                catch (Exception e)
                {

                    try
                    {
                        rdr.Close();
                    }
                    catch (Exception) { }
                    Success = false;
                    Message = "Falha (1): " + e.Message;
                }

            }
            catch (Exception e)
            {
                Success = false;
                Message = "Falha (2): " + e.Message;
            }
            finally
            {
                connectp.myConnection.Close();
            }

            table.Rows.Add(new Object[]{
                HashKey,
                Message,
                Success,
                DataJsonResults
            });
            cmd.Dispose();
            ds.Dispose();
            table.TableName = "metadata";
            return table;

        }

        [Route("api/AdmRural/Register")]
        [HttpGet]
        [ActionName("Register")]
        // http://localhost:60313/api/eCupom33/register?EntidadeDB=dbo.spCadastroUsuarioSistema&DataJson=eyJmTmFtZSI6IiIsImxOYW1lIjoiIiwiZW1haWwiOiJnaWxzb24uZGVsaW1hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMmY3YjUyYWFjZmJmNmY0NGUxM2QyNzY1NmVjYjFmNTkifQ== <-- Exemplo para debug

        public DataTable Register(string StoreProcName, string DataJson)
        {
            string HashKey = null;
            string Message = null;
            Boolean Success = false;
            Boolean isTypeSQLResult;
            string DataJsonResults = null;
            //string[] DataTypeResult;
            string SQLString = null;

            //DataTypeResult = new string[] {"SQL", "JSON"};

            byte[] byteDataJson = Convert.FromBase64String(DataJson);
            string strDataJson = Encoding.UTF8.GetString(byteDataJson);

            //Console.WriteLine(strDataJson);

            // tentantiva de converter JsonToTable
            //var datatb = sdatajson.AsDataTable();


            DataTable table = new DataTable();
            table.Columns.Add("hashkey", typeof(String));
            table.Columns.Add("message", typeof(String));
            table.Columns.Add("success", typeof(Boolean));
            table.Columns.Add("results", typeof(String));

            SqlCommand cmd = new SqlCommand();
            System.Data.DataSet ds = new System.Data.DataSet();
            System.Data.DataSet DataSetResult = new System.Data.DataSet();
            //SqlDataAdapter SDA = new SqlDataAdapter();
            SqlDataReader rdr;

            try
            {
                connectp.myConnection.Open();
                System.Data.SqlClient.SqlParameter wParam1 = new System.Data.SqlClient.SqlParameter("@StringDataJson", System.Data.SqlDbType.VarChar, 255)
                {
                    Value = strDataJson
                };
                cmd.Parameters.Add(wParam1);

                cmd.Connection = connectp.myConnection;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = StoreProcName;
                rdr = cmd.ExecuteReader();
                try
                {
                    rdr.Read();
                    isTypeSQLResult = rdr.GetBoolean(0);
                    HashKey = rdr.GetString(1);
                    Message = rdr.GetString(2);
                    Success = rdr.GetBoolean(3);
                    if (isTypeSQLResult)
                    {
                        SQLString = rdr.GetString(4);
                        connectp.myConnection.Close();
                        connectp.myConnection.Open();
                        SqlDataAdapter adapter = new SqlDataAdapter();
                        adapter.SelectCommand = new SqlCommand(SQLString, connectp.myConnection);
                        try
                        {
                            adapter.Fill(DataSetResult);
                            try
                            {
                                DataTableCollection DC = DataSetResult.Tables;
                                DataTable dTable = DC[0];
                                DataJsonResults = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(dTable, Formatting.Indented)));

                            }
                            catch (Exception e)
                            {
                                Message = e.Message;
                                Success = false;
                            }
                        }
                        catch (Exception e)
                        {
                            Success = false;
                            Message = e.Message;
                        }
                        finally
                        {
                            connectp.myConnection.Close();
                        }
                    }
                    else
                    {
                        DataJsonResults = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(rdr.GetString(4)));
                    }
                    if (Success)
                    {
                        //envio o email com a senha cadastrada
                        // EnviarEmail(email, "cadastro", senha);
                    }
                }
                catch (Exception e)
                {

                    try
                    {
                        rdr.Close();
                    }
                    catch (Exception) { }
                    Success = false;
                    Message = "Falha (1): " + e.Message;
                }

            }
            catch (Exception e)
            {
                Success = false;
                Message = "Falha (2): " + e.Message;
            }
            finally
            {
                connectp.myConnection.Close();
            }

            table.Rows.Add(new Object[]{
                HashKey,
                Message,
                Success,
                DataJsonResults
            });
            cmd.Dispose();
            ds.Dispose();
            table.TableName = "metadata";
            return table;


        }

        // TESTING UPLOAD IMAGE
        //http://localhost:44394/api/Imobiliario/SalvarImagem?  <-- Exemplo para debug
        [Route("api/AdmRural/SalvarImagem")]
        [HttpPost]
        [ActionName("SalvarImagem")]
        public DataTable SalvarImagem()
        //[FromBody] IFormFile value
        {
            DataTable table = new DataTable();
            table.Columns.Add("hashkey", typeof(String));
            table.Columns.Add("message", typeof(String));
            table.Columns.Add("success", typeof(Boolean));
            table.Columns.Add("results", typeof(String));
            table.TableName = "metadata";

            string imagemNome = System.Web.HttpContext.Current.Request.Form["nome"];

            if (String.IsNullOrEmpty(imagemNome))
            {
                imagemNome = Path.GetRandomFileName();
                imagemNome = imagemNome.Replace(".", ""); // Remove period.
            }


            string ruta = System.Web.HttpContext.Current.Request.Form["ruta"];
            if (String.IsNullOrEmpty(ruta))
            {
                table.Rows.Add(new Object[]{
                null,
                "Error",
                false,
                "Ruta is empty"
                });

                return table;
            }


            var imagemFile = System.Web.HttpContext.Current.Request.Files["imagem"];
            if (String.IsNullOrEmpty(imagemFile.FileName))
            {
                table.Rows.Add(new Object[]{
                null,
                "Error",
                false,
                "Imagem File is empty"
                });

                return table;
            }


            var filePath = System.Web.HttpContext.Current.Server.MapPath("~/" + ruta);

            bool exists = System.IO.Directory.Exists(filePath);

            try
            {
                if (!exists)
                    System.IO.Directory.CreateDirectory(filePath);

                imagemNome = imagemNome + Path.GetExtension(imagemFile.FileName);

                //imagemNome = Path.GetRandomFileName() + Path.GetExtension(imagemFile.FileName);


                var fullFilePath = filePath + imagemNome;

                imagemFile.SaveAs(fullFilePath);

                table.Rows.Add(new Object[]{
                null,
                imagemNome,
                true,
                ruta + imagemNome
                });

            }
            catch (Exception e)
            {
                table.Rows.Add(new Object[]{
                null,
                "Error",
                false,
                "Error: " + e.Message
                });
            }

            //URL
            // https://www.c-sharpcorner.com/UploadFile/2b481f/uploading-a-file-in-Asp-Net-web-api/
            // https://www.youtube.com/watch?v=B0aVXo4G-LE

            return table;

        }


        //http://localhost:60313/api/AdmRural/MinhaConta?DataJson=eyJDb2RpZ29Vc3VhcmlvU2lzdGVtYSI6MSwiSGFzaGtleSI6IjhDMkFCMzc1NEI4Rjk4RjQ4OTM2Q0MzREFGOTFENTkxIn0= <-- Exemplo para debug
        [Route("api/AdmRural/MinhaConta")]
        [HttpGet]
        [ActionName("MinhaConta")]
        public DataTable MinhaConta(string StoreProcName, string DataJson)
        {
            string HashKey = null;
            string Message = null;
            Boolean Success = false;
            Boolean isTypeSQLResult;
            string DataJsonResults = null;
            //string[] DataTypeResult;
            string SQLString = null;

            //DataTypeResult = new string[] {"SQL", "JSON"};

            byte[] byteDataJson = Convert.FromBase64String(DataJson);
            string strDataJson = Encoding.UTF8.GetString(byteDataJson);

            //Console.WriteLine(strDataJson);

            // tentantiva de converter JsonToTable
            //var datatb = sdatajson.AsDataTable();


            DataTable table = new DataTable();
            table.Columns.Add("hashkey", typeof(String));
            table.Columns.Add("message", typeof(String));
            table.Columns.Add("success", typeof(Boolean));
            table.Columns.Add("results", typeof(String));

            SqlCommand cmd = new SqlCommand();
            System.Data.DataSet ds = new System.Data.DataSet();
            System.Data.DataSet DataSetResult = new System.Data.DataSet();
            //SqlDataAdapter SDA = new SqlDataAdapter();
            SqlDataReader rdr;

            try
            {
                connectp.myConnection.Open();
                System.Data.SqlClient.SqlParameter wParam1 = new System.Data.SqlClient.SqlParameter("@StringDataJson", System.Data.SqlDbType.VarChar, 255)
                {
                    Value = strDataJson
                };
                cmd.Parameters.Add(wParam1);

                cmd.Connection = connectp.myConnection;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = StoreProcName;
                rdr = cmd.ExecuteReader();
                try
                {
                    rdr.Read();
                    isTypeSQLResult = rdr.GetBoolean(0);
                    HashKey = rdr.GetString(1);
                    Message = rdr.GetString(2);
                    Success = rdr.GetBoolean(3);
                    if (isTypeSQLResult)
                    {
                        SQLString = rdr.GetString(4);
                        connectp.myConnection.Close();
                        connectp.myConnection.Open();
                        SqlDataAdapter adapter = new SqlDataAdapter();
                        adapter.SelectCommand = new SqlCommand(SQLString, connectp.myConnection);
                        try
                        {
                            adapter.Fill(DataSetResult);
                            try
                            {
                                DataTableCollection DC = DataSetResult.Tables;
                                DataTable dTable = DC[0];
                                DataJsonResults = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(dTable, Formatting.Indented)));

                            }
                            catch (Exception e)
                            {
                                Message = e.Message;
                                Success = false;
                            }
                        }
                        catch (Exception e)
                        {
                            Success = false;
                            Message = e.Message;
                        }
                        finally
                        {
                            connectp.myConnection.Close();
                        }
                    }
                    else
                    {
                        DataJsonResults = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(rdr.GetString(4)));
                    }
                    if (Success)
                    {
                        //envio o email com a senha cadastrada
                        // EnviarEmail(email, "cadastro", senha);
                    }
                }
                catch (Exception e)
                {

                    try
                    {
                        rdr.Close();
                    }
                    catch (Exception) { }
                    Success = false;
                    Message = "Falha (1): " + e.Message;
                }

            }
            catch (Exception e)
            {
                Success = false;
                Message = "Falha (2): " + e.Message;
            }
            finally
            {
                connectp.myConnection.Close();
            }

            table.Rows.Add(new Object[]{
                HashKey,
                Message,
                Success,
                DataJsonResults
            });
            cmd.Dispose();
            ds.Dispose();
            table.TableName = "metadata";
            return table;

        }
        // http://localhost:60313/api/AdmRural/fotgotpassword?DataJson=eyJmTmFtZSI6IiIsImxOYW1lIjoiIiwiZW1haWwiOiJnaWxzb24uZGVsaW1hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMmY3YjUyYWFjZmJmNmY0NGUxM2QyNzY1NmVjYjFmNTkifQ== <-- Exemplo para debug
        [Route("api/AdmRural/RecuperaSenha")]
        [HttpGet]
        [ActionName("RecuperaSenha")]
        public DataTable RecuperaSenha(string StoreProcName, string DataJson)
        {
            string HashKey = null;
            string Message = null;
            Boolean Success = false;
            Boolean isTypeSQLResult;
            string DataJsonResults = null;
            //string[] DataTypeResult;
            string SQLString = null;

            //DataTypeResult = new string[] {"SQL", "JSON"};

            byte[] byteDataJson = Convert.FromBase64String(DataJson);
            string strDataJson = Encoding.UTF8.GetString(byteDataJson);

            //Console.WriteLine(strDataJson);

            // tentantiva de converter JsonToTable
            //var datatb = sdatajson.AsDataTable();


            DataTable table = new DataTable();
            table.Columns.Add("hashkey", typeof(String));
            table.Columns.Add("message", typeof(String));
            table.Columns.Add("success", typeof(Boolean));
            table.Columns.Add("results", typeof(String));

            SqlCommand cmd = new SqlCommand();
            System.Data.DataSet ds = new System.Data.DataSet();
            System.Data.DataSet DataSetResult = new System.Data.DataSet();
            //SqlDataAdapter SDA = new SqlDataAdapter();
            SqlDataReader rdr;

            try
            {
                connectp.myConnection.Open();
                System.Data.SqlClient.SqlParameter wParam1 = new System.Data.SqlClient.SqlParameter("@StringDataJson", System.Data.SqlDbType.VarChar, 255)
                {
                    Value = strDataJson
                };
                cmd.Parameters.Add(wParam1);

                cmd.Connection = connectp.myConnection;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = StoreProcName;
                rdr = cmd.ExecuteReader();
                try
                {
                    rdr.Read();
                    isTypeSQLResult = rdr.GetBoolean(0);
                    HashKey = rdr.GetString(1);
                    Message = rdr.GetString(2);
                    Success = rdr.GetBoolean(3);
                    if (isTypeSQLResult)
                    {
                        SQLString = rdr.GetString(4);
                        connectp.myConnection.Close();
                        connectp.myConnection.Open();
                        SqlDataAdapter adapter = new SqlDataAdapter();
                        adapter.SelectCommand = new SqlCommand(SQLString, connectp.myConnection);
                        try
                        {
                            adapter.Fill(DataSetResult);
                            try
                            {
                                DataTableCollection DC = DataSetResult.Tables;
                                DataTable dTable = DC[0];
                                DataJsonResults = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(dTable, Formatting.Indented)));

                            }
                            catch (Exception e)
                            {
                                Message = e.Message;
                                Success = false;
                            }
                        }
                        catch (Exception e)
                        {
                            Success = false;
                            Message = e.Message;
                        }
                        finally
                        {
                            connectp.myConnection.Close();
                        }
                    }
                    else
                    {
                        DataJsonResults = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(rdr.GetString(4)));
                    }
                    if (Success)
                    {
                        //envio o email com a senha cadastrada
                        //EnviarEmail(email, "cadastro", senha);
                    }
                }
                catch (Exception e)
                {

                    try
                    {
                        rdr.Close();
                    }
                    catch (Exception) { }
                    Success = false;
                    Message = "Falha (1): " + e.Message;
                }

            }
            catch (Exception e)
            {
                Success = false;
                Message = "Falha (2): " + e.Message;
            }
            finally
            {
                connectp.myConnection.Close();
            }

            table.Rows.Add(new Object[]{
                HashKey,
                Message,
                Success,
                DataJsonResults
            });
            cmd.Dispose();
            ds.Dispose();
            table.TableName = "metadata";
            return table;

        }


        // http://localhost:60313/api/AdmRural/Executar?StoreProcName=spUsuarioAuthentication&DataJson=eyJmTmFtZSI6IiIsImxOYW1lIjoiIiwiZW1haWwiOiJnaWxzb24uZGVsaW1hQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMmY3YjUyYWFjZmJmNmY0NGUxM2QyNzY1NmVjYjFmNTkifQ==
        [Route("api/AdmRural/Executar")]
        [HttpGet]
        [ActionName("Executar")]
        public DataTable Executar(string StoreProcName, string DataJson)
        {
            string HashKey = null;
            string Message = null;
            Boolean Success = false;
            Boolean isTypeSQLResult = false;
            string DataJsonResults = null;
            string SQLString = null;
            byte[] byteDataJson = Convert.FromBase64String(DataJson);
            string strDataJson = Encoding.UTF8.GetString(byteDataJson);

            strDataJson = decripta(strDataJson);
            //byte[] byteDataJson = Convert.FromBase64String(DataJson);
            //string strDataJson = Encoding.UTF8.GetString(byteDataJson);
            //strDataJson = decripta(strDataJson);
            //Console.WriteLine(strDataJson);

               
            DataTable table = new DataTable();
            table.Columns.Add("hashkey", typeof(String));
            table.Columns.Add("message", typeof(String));
            table.Columns.Add("success", typeof(Boolean));
            table.Columns.Add("results", typeof(String));

            SqlCommand cmd = new SqlCommand();
            System.Data.DataSet ds = new System.Data.DataSet();
            System.Data.DataSet DataSetResult = new System.Data.DataSet();
            //SqlDataAdapter SDA = new SqlDataAdapter();
            SqlDataReader rdr;
            try
            {
                connectp.myConnection.Open();
                System.Data.SqlClient.SqlParameter wParam1 = new System.Data.SqlClient.SqlParameter("@StringDataJson", System.Data.SqlDbType.VarChar, 4096)
                {
                    Value = strDataJson
                };
                cmd.Parameters.Add(wParam1);

                cmd.Connection = connectp.myConnection;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = StoreProcName;
                rdr = cmd.ExecuteReader();
                try
                {
                    rdr.Read();
                    isTypeSQLResult = rdr.GetBoolean(0);
                    HashKey = rdr.GetString(1);
                    Message = rdr.GetString(2);
                    Success = rdr.GetBoolean(3);
                    if (isTypeSQLResult)
                    {
                        SQLString = rdr.GetString(4);
                        connectp.myConnection.Close();
                        connectp.myConnection.Open();
                        SqlDataAdapter adapter = new SqlDataAdapter();
                        adapter.SelectCommand = new SqlCommand(SQLString, connectp.myConnection);
                        try
                        {
                            adapter.Fill(DataSetResult);
                            try
                            {
                                DataTableCollection DC = DataSetResult.Tables;
                                DataTable dTable = DC[0];
                                DataJsonResults = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(dTable, Formatting.Indented)));

                            }
                            catch (Exception e)
                            {
                                Message = e.Message;
                                Success = false;
                            }
                        }
                        catch (Exception e)
                        {
                            Success = false;
                            Message = e.Message;
                        }
                        finally
                        {
                            connectp.myConnection.Close();
                        }
                    }
                    else
                    {
                        DataJsonResults = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(rdr.GetString(4)));
                    }
                    if (Success)
                    {
                        //envio o email com a senha cadastrada
                        // EnviarEmail(email, "cadastro", senha);
                    }
                }
                catch (Exception e)
                {

                    try
                    {
                        rdr.Close();
                    }
                    catch (Exception) { }
                    Success = false;
                    Message = "Falha (1): " + e.Message;
                }

            }
            catch (Exception e)
            {
                Success = false;
                Message = "Falha (2): " + e.Message;
            }
            finally
            {
                connectp.myConnection.Close();
            }

            table.Rows.Add(new Object[]{
                HashKey,
                Message,
                Success,
                DataJsonResults
            });
            cmd.Dispose();
            ds.Dispose();
            table.TableName = "metadata";
            return table;

        }


        private static DataSet SelectRows(DataSet dataset,
        string connectionString, string queryString)
        {
            using (SqlConnection connection =
                new SqlConnection(connectionString))
            {
                SqlDataAdapter adapter = new SqlDataAdapter();
                adapter.SelectCommand = new SqlCommand(
                    queryString, connection);
                adapter.Fill(dataset);
                return dataset;
            }
        }


        /*
        * string imagePath=@"E:\images\sample.png";  
        * string imgBase64String = GetBase64StringFromImage(imagePath);  
        * Console.WriteLine(imgBase64String);          
        */
        protected static string GetBase64StringFromImage(string imgPath)
        {
            byte[] imageBytes = System.IO.File.ReadAllBytes(imgPath);
            string base64String = Convert.ToBase64String(imageBytes);
            return base64String;
        }


        public void SaveImageB64toPNGFile(string filename, string base64Image)
        {
            //string destinationImgPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + Constants.UserImagesPath + "\\" + filename + ".png";
            string destinationImgPath = Constants.UserImagesPath + "\\" + filename + ".png";
            try
            {
                //Directory.CreateDirectory(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + Constants.UserImagesPath);
                Directory.CreateDirectory("C:\\" + Constants.UserImagesPath);
            }
            catch (IOException iox)
            {
                Console.WriteLine(iox.Message + " " + iox.Data);
            }
            var bytes = Convert.FromBase64String(base64Image);
            using (var imageFile = new FileStream(destinationImgPath, FileMode.Create))
            {
                imageFile.Write(bytes, 0, bytes.Length);
                imageFile.Flush();
            }
        }


        private string decripta(String texto)
        {
            if (texto == null)
                texto = "";
            String retorno = "";
            String stexto = texto;
            if (stexto == "")
            {
                return stexto;
            }
            try
            {
                while (true)
                {
                    String letra = stexto.Substring(0, 3);
                    int snumero = int.Parse(letra);
                    snumero -= 166;
                    retorno += char.ConvertFromUtf32(snumero);
                    stexto = stexto.Substring(3);
                    if (stexto == "")
                    {
                        break;
                    }
                }
            }
            catch (Exception e)
            {

                retorno = "Falha (2): " + e.Message;
            }
            return retorno;

        }

        private string DCdecripta(string valor)
        {
            string valor2 = decripta(valor);
            byte[] valor3 = Convert.FromBase64String(valor2);
            valor2 = Encoding.UTF8.GetString(valor3);
            return valor2;
        }

        private string RetiraAcentos(string valor)
        {
            string retorno = "";
            if (valor == null)
                valor = "";
            retorno = valor;
            retorno = retorno.ToUpper();
            retorno = retorno.Replace("Ã", "A");
            retorno = retorno.Replace("Á", "A");
            retorno = retorno.Replace("Ó", "O");
            retorno = retorno.Replace("Ô", "O");
            retorno = retorno.Replace("Õ", "O");
            retorno = retorno.Replace("Ç", "C");
            retorno = retorno.Replace("É", "E");
            retorno = retorno.Replace("Ê", "E");
            retorno = retorno.Replace("Í", "I");
            retorno = retorno.Replace("Ú", "U");
            retorno = retorno.Replace("'", "");
            return retorno;
        }

        public int RandomNumber(int min, int max)
        {
            Random random = new Random();
            return random.Next(min, max);
        }

        public string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }

        public string RandomPassword()
        {
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(4, true));
            builder.Append(RandomNumber(1000, 9999));
            builder.Append(RandomString(2, false));
            return builder.ToString();
        }

        public string EnviarEmail(string email, string tipo, string valor)
        {
            string retorno = "";
            try
            {
                //envio email
                String body = "";
                if (tipo == "cadastro")
                {
                    body = "Bem vindo ao eCUPOM. Para acessar, utilize seu e-mail ou CPF junto com a senha abaixo\n";
                    body = body + "Senha:" + valor;
                }

                wsEmail.Servicoemail wse = new wsEmail.Servicoemail();
                retorno = wse.EmailMopCidadao(email, body);
                if (retorno == "ok")
                    retorno = "ok;";
            }
            catch (Exception ex)
            {
                retorno = ex.Message;
            }
            return retorno;
        }



    }

}