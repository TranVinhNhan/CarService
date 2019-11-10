using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace CarService.API.Models
{
    public class AutomotivePart
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double CurrentPrice { get; set; }

        public AutomotivePartType AutomotivePartType { get; set; }
        public int AutomotivePartTypeId { get; set; }
        public Supplier Supplier { get; set; }
        public int SupplierId { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<AutomotivePartRepairReceipt> AutomotivePartRepairReceipts { get; set; }

        public AutomotivePart()
        {
            Photos = new Collection<Photo>();
        }
    }
}