using System;

namespace CarService.API.Dtos
{
    public class CarReceiptForReturnDto
    {
        public int Id { get; set; }
        public string LicensePlateNumber { get; set; }
        public string CarModel { get; set; }
        public string Brand { get; set; }
        public DateTime DayReceived { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public int UserId { get; set; }
        public int ServiceId { get; set; }
        public int RepairReceiptId { get; set; }
    }
}