using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SecondMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("e68f38ab-997e-414f-bedd-abe6242da185"));

            migrationBuilder.AddColumn<int>(
                name: "LeadRank",
                table: "Leads",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("b5272613-a724-4e95-9b06-05dd9e298cd9"), null, new DateTimeOffset(new DateTime(2024, 11, 15, 12, 3, 9, 431, DateTimeKind.Unspecified).AddTicks(8453), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "GBkot+lyZuOh61q7ARO+aiQWBEKrbVhVTcSaKt2pm7g=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 15, 6, 48, 9, 431, DateTimeKind.Unspecified).AddTicks(8559), new TimeSpan(0, 0, 0, 0, 0)), "UbDgpCXcnVzKfKQD4lzVSg==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("b5272613-a724-4e95-9b06-05dd9e298cd9"));

            migrationBuilder.DropColumn(
                name: "LeadRank",
                table: "Leads");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("e68f38ab-997e-414f-bedd-abe6242da185"), null, new DateTimeOffset(new DateTime(2024, 11, 14, 12, 9, 40, 442, DateTimeKind.Unspecified).AddTicks(4692), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "oieEiS6DXGrPZcW9LMJEE7PHT2Pc1XEYlw+rncsjonU=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 14, 6, 54, 40, 442, DateTimeKind.Unspecified).AddTicks(4757), new TimeSpan(0, 0, 0, 0, 0)), "a0yerka8oiL8WRM31EDibQ==", (byte)1 });
        }
    }
}
