using System;
using System.Collections.Generic;

namespace CarService.API.Models
{
    public class RepairReceipt
    {
        public int Id { get; set; }
        public DateTime RepairedDay { get; set; }
        public string Description { get; set; }

        public CarReceipt CarReceipt { get; set; }
        public int CarReceiptId { get; set; }
        public ICollection<AutomotivePartRepairReceipt> AutomotivePartRepairReceipts { get; set; }
    }
}