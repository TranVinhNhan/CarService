using CarService.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CarService.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<AutomotivePart> AutomotiveParts { get; set; }
        public DbSet<AutomotivePartType> AutomotivePartTypes { get; set; }
        public DbSet<CarReceipt> CarReceipts { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<CarReceiptService> CarReceiptService { get; set; }
        public DbSet<RepairReceipt> RepairReceipt { get; set; }
        public DbSet<AutomotivePartRepairReceipt> AutomotivePartRepairReceipt { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<ShoppingCartItem> ShoppingCartItems { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }
        public DbSet<ProductOrderDetail> ProductOrderDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AutomotivePartRepairReceipt>()
                .HasKey(c => new { c.AutomotivePartId, c.RepairReceiptId });
            modelBuilder.Entity<CarReceiptService>()
                .HasKey(c => new { c.CarReceiptId, c.ServiceId });
        }
    }
}