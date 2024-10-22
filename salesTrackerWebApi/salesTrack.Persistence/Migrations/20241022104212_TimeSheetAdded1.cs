using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class TimeSheetAdded1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("e92e30af-5885-4631-91b3-96eae3185100"));

            migrationBuilder.AlterColumn<Guid>(
                name: "ProcessStep",
                table: "TimeSheet",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("54ad4fcb-c3d9-4dc5-9eb0-d35769fd1ff2"), null, new DateTimeOffset(new DateTime(2024, 10, 22, 16, 12, 11, 708, DateTimeKind.Unspecified).AddTicks(1039), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "7gebiLq2KhIEZ4WxySPRgKb0XRGnUYh0L7ncvpylfwc=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 22, 10, 57, 11, 708, DateTimeKind.Unspecified).AddTicks(1110), new TimeSpan(0, 0, 0, 0, 0)), "sjNGJXiPLqljLRmVLRI3iQ==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("54ad4fcb-c3d9-4dc5-9eb0-d35769fd1ff2"));

            migrationBuilder.AlterColumn<string>(
                name: "ProcessStep",
                table: "TimeSheet",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("e92e30af-5885-4631-91b3-96eae3185100"), null, new DateTimeOffset(new DateTime(2024, 10, 22, 16, 5, 29, 945, DateTimeKind.Unspecified).AddTicks(2954), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "jYl5oK4VFzS1DBtVsT492rxDU9tGGZk44vA+l1xZ3TE=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 22, 10, 50, 29, 945, DateTimeKind.Unspecified).AddTicks(3016), new TimeSpan(0, 0, 0, 0, 0)), "KohMQK7FloX33hjBEeyd3w==", (byte)1 });
        }
    }
}
