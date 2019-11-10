using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarService.API.Models
{
    public class CarReceiptService
    {
        [Key, Column(Order = 0)]
        public int CarReceiptId { get; set; }
        public CarReceipt CarReceipt { get; set; }
        
        [Key, Column(Order = 1)]
        public int ServiceId { get; set; }
        public Service Service { get; set; }
    }
}