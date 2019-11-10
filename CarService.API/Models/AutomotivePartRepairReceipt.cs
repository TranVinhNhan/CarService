using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarService.API.Models
{
    public class AutomotivePartRepairReceipt
    {
        [Key, Column(Order = 0)]
        public int AutomotivePartId { get; set; }
        public AutomotivePart AutomotivePart { get; set; }
        
        [Key, Column(Order = 1)]
        public int RepairReceiptId { get; set; }
        public RepairReceipt RepairReceipt { get; set; }
        public int Quantity { get; set; }
        public double Wage { get; set; }
    }
}