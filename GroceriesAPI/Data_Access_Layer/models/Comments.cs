using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GroceriesAPI.models
{
    public class Comments
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string Username { get; set; }
        public string Comment { get; set; }
    }
}
