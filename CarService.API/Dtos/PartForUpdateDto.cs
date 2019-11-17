namespace CarService.API.Dtos
{
    public class PartForUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double CurrentPrice { get; set; }
        public int AutomotivePartTypeId { get; set; }
        public int SupplierId { get; set; }
    }
}