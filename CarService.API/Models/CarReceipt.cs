using System;
using System.Collections.Generic;

namespace CarService.API.Models
{
    public class CarReceipt
    {
        public int Id { get; set; }
        public string LicensePlateNumber { get; set; }
        public string CarModel { get; set; }
        public string Brand { get; set; }
        public DateTime DayReceived { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }

        public ICollection<CarReceiptService> CarReceiptServices { get; set; }

        public RepairReceipt RepairReceipt { get; set; }
    }
}