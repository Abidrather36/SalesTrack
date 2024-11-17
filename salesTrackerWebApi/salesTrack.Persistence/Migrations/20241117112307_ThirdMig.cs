using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ThirdMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("b5272613-a724-4e95-9b06-05dd9e298cd9"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("740e660a-3bee-47c9-8117-411dd5e1e89d"), null, new DateTimeOffset(new DateTime(2024, 11, 17, 16, 53, 4, 716, DateTimeKind.Unspecified).AddTicks(4045), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "0HeIzqtZr/AP9dxCb3PJzthciWtNWjkIxzm/uTCU7jc=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 17, 11, 38, 4, 716, DateTimeKind.Unspecified).AddTicks(4139), new TimeSpan(0, 0, 0, 0, 0)), "7AWZdIly1SmjRMgfF8Y/GQ==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("740e660a-3bee-47c9-8117-411dd5e1e89d"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("b5272613-a724-4e95-9b06-05dd9e298cd9"), null, new DateTimeOffset(new DateTime(2024, 11, 15, 12, 3, 9, 431, DateTimeKind.Unspecified).AddTicks(8453), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "GBkot+lyZuOh61q7ARO+aiQWBEKrbVhVTcSaKt2pm7g=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 15, 6, 48, 9, 431, DateTimeKind.Unspecified).AddTicks(8559), new TimeSpan(0, 0, 0, 0, 0)), "UbDgpCXcnVzKfKQD4lzVSg==", (byte)1 });
        }
    }
}
