using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServiceAdmRural.Models
{
    public class FileUpload
    {
        public string Chave { get; set; }
        public string Codigo { get; set; }
        public string Tipo { get; set; }
        public string Assinante { get; set; }
        public string Excluir { get; set; }
        public string Foto { get; set; }
    }
}