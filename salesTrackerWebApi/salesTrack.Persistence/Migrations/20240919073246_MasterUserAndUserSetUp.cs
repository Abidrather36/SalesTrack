using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class MasterUserAndUserSetUp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Users_Id",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_Leads_Users_Id",
                table: "Leads");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("75f07caa-d12c-4a9c-9739-50af2056c1a2"));

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsPasswordTemporary",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ResetCode",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ResetExpiry",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Salt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserRole",
                table: "Users");

            migrationBuilder.CreateTable(
                name: "MasterUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserRole = table.Column<byte>(type: "tinyint", nullable: false),
                    ResetCode = table.Column<int>(type: "int", nullable: false),
                    ResetExpiry = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    IsPasswordTemporary = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    ModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ModifiedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MasterUsers", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("36f7bbbc-2908-4533-ac85-a2d9b9311d40"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "zcMZXJ6isZjVyoughFOYzbNmFC91seo8MQ2DMi+/dO4=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 9, 19, 7, 47, 44, 192, DateTimeKind.Unspecified).AddTicks(1240), new TimeSpan(0, 0, 0, 0, 0)), "AOCjvVVk6fD1+85nDbABzA==", (byte)1 });

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_MasterUsers_Id",
                table: "Companies",
                column: "Id",
                principalTable: "MasterUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Leads_MasterUsers_Id",
                table: "Leads",
                column: "Id",
                principalTable: "MasterUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_MasterUsers_Id",
                table: "Users",
                column: "Id",
                principalTable: "MasterUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_MasterUsers_Id",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_Leads_MasterUsers_Id",
                table: "Leads");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_MasterUsers_Id",
                table: "Users");

            migrationBuilder.DropTable(
                name: "MasterUsers");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPasswordTemporary",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ResetCode",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "ResetExpiry",
                table: "Users",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Salt",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "UserRole",
                table: "Users",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("75f07caa-d12c-4a9c-9739-50af2056c1a2"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "mr1FmWJtocJo1qWgpofLjuJAw3IUQCYxnY+GaaQRfok=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 9, 18, 11, 44, 53, 499, DateTimeKind.Unspecified).AddTicks(5616), new TimeSpan(0, 0, 0, 0, 0)), "UgUQM0NyifArfaTldUtbZg==", (byte)1, (byte)0 });

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Users_Id",
                table: "Companies",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Leads_Users_Id",
                table: "Leads",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
