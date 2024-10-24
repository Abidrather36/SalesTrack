using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class secodMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("472b1333-438f-41e1-8ab7-feafe3ba4710"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("f4c7de49-4344-4fab-8bd8-fce9827e8f68"), null, new DateTimeOffset(new DateTime(2024, 10, 24, 10, 42, 58, 116, DateTimeKind.Unspecified).AddTicks(7693), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "2S2NbSZA7nc1oFPn1SbQyXBDm+1cyDdobkm1Zh2XyHE=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 24, 5, 27, 58, 116, DateTimeKind.Unspecified).AddTicks(7787), new TimeSpan(0, 0, 0, 0, 0)), "LYwHxCpJxbefHukLqjy/Qg==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("f4c7de49-4344-4fab-8bd8-fce9827e8f68"));

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("472b1333-438f-41e1-8ab7-feafe3ba4710"), null, new DateTimeOffset(new DateTime(2024, 10, 24, 10, 37, 48, 207, DateTimeKind.Unspecified).AddTicks(5173), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "Pgn/yW4QIqUxsf2qbyE8f8P+X2BOBjCAi0diKSx2Jnw=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 24, 5, 22, 48, 207, DateTimeKind.Unspecified).AddTicks(5238), new TimeSpan(0, 0, 0, 0, 0)), "geN3n0129MkGsk1qb3YvAw==", (byte)1 });
        }
    }
}
