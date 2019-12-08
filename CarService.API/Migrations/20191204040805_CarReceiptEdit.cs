using Microsoft.EntityFrameworkCore.Migrations;

namespace CarService.API.Migrations
{
    public partial class CarReceiptEdit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "CarReceipts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "CarReceipts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "CarReceipts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "CarReceipts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "CarReceipts");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "CarReceipts");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "CarReceipts");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "CarReceipts");
        }
    }
}
