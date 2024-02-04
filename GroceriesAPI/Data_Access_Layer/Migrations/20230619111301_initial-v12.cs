using Microsoft.EntityFrameworkCore.Migrations;

namespace GroceriesAPI.Migrations
{
    public partial class initialv12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "cart",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<int>(nullable: false),
                    productId = table.Column<int>(nullable: false),
                    Product = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    price = table.Column<string>(nullable: true),
                    Image = table.Column<string>(nullable: true),
                    Category = table.Column<string>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    Discount = table.Column<string>(nullable: true),
                    Weight = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cart", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "cart");
        }
    }
}
