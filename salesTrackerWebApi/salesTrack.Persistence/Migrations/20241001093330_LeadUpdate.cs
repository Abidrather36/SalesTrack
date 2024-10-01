using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class LeadUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("7ec27075-3a19-4bb8-a5ff-a20ef959155d"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("15eda46a-374e-42ce-8ba5-2a272354099d"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "fyMlcw6DQctF4osdFA1mGiftfxy8P6Zx52CIRCNJQOk=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 1, 9, 48, 18, 393, DateTimeKind.Unspecified).AddTicks(8620), new TimeSpan(0, 0, 0, 0, 0)), "5l6nq1uGPZBFSxAETh3EDw==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("15eda46a-374e-42ce-8ba5-2a272354099d"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("7ec27075-3a19-4bb8-a5ff-a20ef959155d"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "FbPSeRQPV8Qb50RIhYs7PXymWZMCehwDtoJbw65gqQU=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 9, 23, 5, 42, 1, 649, DateTimeKind.Unspecified).AddTicks(4736), new TimeSpan(0, 0, 0, 0, 0)), "nBQGAJXs3XDSc3yN5oFp2g==", (byte)1 });
        }
    }
}
