using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CarService.API.Migrations
{
    public partial class NewDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AutomotivePartTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TypeName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutomotivePartTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Contact = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    LastActive = table.Column<DateTime>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    PaymentCardNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AutomotiveParts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    CurrentPrice = table.Column<double>(nullable: false),
                    AutomotivePartTypeId = table.Column<int>(nullable: false),
                    SupplierId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutomotiveParts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AutomotiveParts_AutomotivePartTypes_AutomotivePartTypeId",
                        column: x => x.AutomotivePartTypeId,
                        principalTable: "AutomotivePartTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AutomotiveParts_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarReceipts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LicensePlateNumber = table.Column<string>(nullable: true),
                    CarModel = table.Column<string>(nullable: true),
                    Brand = table.Column<string>(nullable: true),
                    DayReceived = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarReceipts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarReceipts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductOrders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OrderPlacedTime = table.Column<DateTime>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    AddressOptional = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    OrderTotal = table.Column<double>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductOrders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(nullable: true),
                    PublicId = table.Column<string>(nullable: true),
                    AutomotivePartId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_AutomotiveParts_AutomotivePartId",
                        column: x => x.AutomotivePartId,
                        principalTable: "AutomotiveParts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShoppingCartItems",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    AutomotivePartId = table.Column<int>(nullable: false),
                    ShoppingCartId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingCartItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoppingCartItems_AutomotiveParts_AutomotivePartId",
                        column: x => x.AutomotivePartId,
                        principalTable: "AutomotiveParts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarReceiptService",
                columns: table => new
                {
                    CarReceiptId = table.Column<int>(nullable: false),
                    ServiceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarReceiptService", x => new { x.CarReceiptId, x.ServiceId });
                    table.ForeignKey(
                        name: "FK_CarReceiptService_CarReceipts_CarReceiptId",
                        column: x => x.CarReceiptId,
                        principalTable: "CarReceipts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarReceiptService_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RepairReceipt",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RepairedDay = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    CarReceiptId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RepairReceipt", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RepairReceipt_CarReceipts_CarReceiptId",
                        column: x => x.CarReceiptId,
                        principalTable: "CarReceipts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductOrderDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    ProductOrderId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductOrderDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductOrderDetails_ProductOrders_ProductOrderId",
                        column: x => x.ProductOrderId,
                        principalTable: "ProductOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AutomotivePartRepairReceipt",
                columns: table => new
                {
                    AutomotivePartId = table.Column<int>(nullable: false),
                    RepairReceiptId = table.Column<int>(nullable: false),
                    AutomotivePartId1 = table.Column<int>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    Wage = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutomotivePartRepairReceipt", x => new { x.AutomotivePartId, x.RepairReceiptId });
                    table.ForeignKey(
                        name: "FK_AutomotivePartRepairReceipt_AutomotiveParts_AutomotivePartId1",
                        column: x => x.AutomotivePartId1,
                        principalTable: "AutomotiveParts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AutomotivePartRepairReceipt_RepairReceipt_RepairReceiptId",
                        column: x => x.RepairReceiptId,
                        principalTable: "RepairReceipt",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AutomotivePartRepairReceipt_AutomotivePartId1",
                table: "AutomotivePartRepairReceipt",
                column: "AutomotivePartId1");

            migrationBuilder.CreateIndex(
                name: "IX_AutomotivePartRepairReceipt_RepairReceiptId",
                table: "AutomotivePartRepairReceipt",
                column: "RepairReceiptId");

            migrationBuilder.CreateIndex(
                name: "IX_AutomotiveParts_AutomotivePartTypeId",
                table: "AutomotiveParts",
                column: "AutomotivePartTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AutomotiveParts_SupplierId",
                table: "AutomotiveParts",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_CarReceipts_UserId",
                table: "CarReceipts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CarReceiptService_ServiceId",
                table: "CarReceiptService",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_AutomotivePartId",
                table: "Photos",
                column: "AutomotivePartId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrderDetails_ProductOrderId",
                table: "ProductOrderDetails",
                column: "ProductOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductOrders_UserId",
                table: "ProductOrders",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RepairReceipt_CarReceiptId",
                table: "RepairReceipt",
                column: "CarReceiptId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingCartItems_AutomotivePartId",
                table: "ShoppingCartItems",
                column: "AutomotivePartId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AutomotivePartRepairReceipt");

            migrationBuilder.DropTable(
                name: "CarReceiptService");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "ProductOrderDetails");

            migrationBuilder.DropTable(
                name: "ShoppingCartItems");

            migrationBuilder.DropTable(
                name: "RepairReceipt");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "ProductOrders");

            migrationBuilder.DropTable(
                name: "AutomotiveParts");

            migrationBuilder.DropTable(
                name: "CarReceipts");

            migrationBuilder.DropTable(
                name: "AutomotivePartTypes");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
