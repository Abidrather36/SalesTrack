using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class TimeSheetAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("371869a4-99ed-49ff-8d4d-794486f511ce"));

            migrationBuilder.CreateTable(
                name: "TimeSheet",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProcessStep = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HoursSpent = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SalesExecutiveId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("PK_TimeSheet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeSheet_Users_SalesExecutiveId",
                        column: x => x.SalesExecutiveId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("e92e30af-5885-4631-91b3-96eae3185100"), null, new DateTimeOffset(new DateTime(2024, 10, 22, 16, 5, 29, 945, DateTimeKind.Unspecified).AddTicks(2954), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "jYl5oK4VFzS1DBtVsT492rxDU9tGGZk44vA+l1xZ3TE=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 22, 10, 50, 29, 945, DateTimeKind.Unspecified).AddTicks(3016), new TimeSpan(0, 0, 0, 0, 0)), "KohMQK7FloX33hjBEeyd3w==", (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_TimeSheet_SalesExecutiveId",
                table: "TimeSheet",
                column: "SalesExecutiveId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimeSheet");

            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("e92e30af-5885-4631-91b3-96eae3185100"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("371869a4-99ed-49ff-8d4d-794486f511ce"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "0ZxvzBE6PcMArdnfMLorernffIUyjn5N1jddZB80o8E=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 14, 5, 59, 4, 287, DateTimeKind.Unspecified).AddTicks(6414), new TimeSpan(0, 0, 0, 0, 0)), "tz/klzjpTrGA1ma+2FcxGw==", (byte)1 });
        }
    }
}
