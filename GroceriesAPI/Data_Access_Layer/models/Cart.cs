using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GroceriesAPI.models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        public int userId { get; set; }
        public int productId { get; set; }
        public string Product { get; set; }
        public string Description { get; set; }
        public int price { get; set; }
        public string Image { get; set; }

        public string Category { get; set; }
        public int Quantity { get; set; }
        public int Discount { get; set; }
        public string Weight { get; set; }

        public string username { get; set; }

       
    }
}
