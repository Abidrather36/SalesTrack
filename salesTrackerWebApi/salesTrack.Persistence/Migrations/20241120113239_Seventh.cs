using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Seventh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("80fd018f-36eb-4c1f-adce-5cb03b023bcc"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("b438c57d-0aed-4d26-a209-063700c543ee"), null, new DateTimeOffset(new DateTime(2024, 11, 20, 17, 2, 38, 236, DateTimeKind.Unspecified).AddTicks(3132), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "2V1nOyT/Y3RV0ddpM3RdiEE9U7A6hO4qFHpK7eOwsMY=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 20, 11, 47, 38, 236, DateTimeKind.Unspecified).AddTicks(3191), new TimeSpan(0, 0, 0, 0, 0)), "+Fl/RLZjAOF1GieK+jPVsQ==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("b438c57d-0aed-4d26-a209-063700c543ee"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("80fd018f-36eb-4c1f-adce-5cb03b023bcc"), null, new DateTimeOffset(new DateTime(2024, 11, 20, 16, 50, 26, 912, DateTimeKind.Unspecified).AddTicks(6907), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "6s+xCh0/air4YlrpX0Mn3LGv+PsMj1HdzUosdTDsXGg=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 11, 20, 11, 35, 26, 912, DateTimeKind.Unspecified).AddTicks(7000), new TimeSpan(0, 0, 0, 0, 0)), "D3crDehyYbxisyn1mFMoIw==", (byte)1 });
        }
    }
}
