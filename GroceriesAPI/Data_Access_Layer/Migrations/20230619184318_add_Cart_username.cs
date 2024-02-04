using Microsoft.EntityFrameworkCore.Migrations;

namespace GroceriesAPI.Migrations
{
    public partial class add_Cart_username : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "username",
                table: "cart",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "username",
                table: "cart");
        }
    }
}
