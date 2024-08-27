using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class relationshipBetweenUserandLead : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("69d6aac6-0478-424c-8af1-e78986ca2151"));

            migrationBuilder.AlterColumn<Guid>(
                name: "AssignTo",
                table: "Leads",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("b02df487-abd6-4848-8133-f04b6998218e"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "hd3IZI8XhKpIpSv4rVR+9xW7onwLHbmhjwbKMLreR+s=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 26, 6, 54, 18, 120, DateTimeKind.Unspecified).AddTicks(8058), new TimeSpan(0, 0, 0, 0, 0)), "mPou+BYCJAK0txiBzLUGtw==", (byte)1, (byte)0 });

            migrationBuilder.CreateIndex(
                name: "IX_Leads_AssignTo",
                table: "Leads",
                column: "AssignTo",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Leads_Users_AssignTo",
                table: "Leads",
                column: "AssignTo",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leads_Users_AssignTo",
                table: "Leads");

            migrationBuilder.DropIndex(
                name: "IX_Leads_AssignTo",
                table: "Leads");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("b02df487-abd6-4848-8133-f04b6998218e"));

            migrationBuilder.AlterColumn<string>(
                name: "AssignTo",
                table: "Leads",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("69d6aac6-0478-424c-8af1-e78986ca2151"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "LPTTk94PkKPwikPCfnP0fU8mA4Y8gDDSNfawTVLv4W8=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 26, 5, 33, 30, 30, DateTimeKind.Unspecified).AddTicks(4468), new TimeSpan(0, 0, 0, 0, 0)), "FRIy0KJHTGSHuS9juiv+AQ==", (byte)1, (byte)0 });
        }
    }
}
