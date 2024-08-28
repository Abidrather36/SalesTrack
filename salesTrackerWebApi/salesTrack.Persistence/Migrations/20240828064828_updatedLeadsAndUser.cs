using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class updatedLeadsAndUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("93de942e-e4e3-40c7-97a7-0428d770ca54"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("d6695ece-2f42-4073-a46b-e0d00187b0da"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "s8PznF6VPZHf/rnkkaTx8kfIKyF9GiVKNafxcCXtqd8=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 28, 7, 3, 25, 674, DateTimeKind.Unspecified).AddTicks(465), new TimeSpan(0, 0, 0, 0, 0)), "LZSdjyUhxugWrIkniS0Rag==", (byte)1, (byte)0 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("d6695ece-2f42-4073-a46b-e0d00187b0da"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("93de942e-e4e3-40c7-97a7-0428d770ca54"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "gogSRQkBljjzH7MUE1C9vYyZiTRf98otPQayCWLtn38=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 27, 7, 14, 44, 856, DateTimeKind.Unspecified).AddTicks(1251), new TimeSpan(0, 0, 0, 0, 0)), "59umvQT0hwdePKStu+CceA==", (byte)1, (byte)0 });
        }
    }
}
