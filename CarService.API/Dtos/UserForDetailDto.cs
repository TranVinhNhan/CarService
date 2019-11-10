using System;
using System.Collections.Generic;
using CarService.API.Models;

namespace CarService.API.Dtos
{
    public class UserForDetailDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string PaymentCardNumber { get; set; }

        public ICollection<CarReceipt> CarReceipts { get; set; }
    }
}