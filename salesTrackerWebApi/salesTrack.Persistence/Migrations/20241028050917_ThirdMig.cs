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
                keyValue: new Guid("f4c7de49-4344-4fab-8bd8-fce9827e8f68"));

            migrationBuilder.AlterColumn<string>(
                name: "ProcessStepName",
                table: "TimeSheets",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("fdf7b964-b982-4953-997a-0ff1b7c5d186"), null, new DateTimeOffset(new DateTime(2024, 10, 28, 10, 39, 15, 24, DateTimeKind.Unspecified).AddTicks(4325), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "UJvngTia3Wzs3XhebLHzEqwsakYXAplVdTEpgzaSREg=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 28, 5, 24, 15, 24, DateTimeKind.Unspecified).AddTicks(4396), new TimeSpan(0, 0, 0, 0, 0)), "tzyUiMBamyvW+D0HGda2lg==", (byte)1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("fdf7b964-b982-4953-997a-0ff1b7c5d186"));

            migrationBuilder.AlterColumn<Guid>(
                name: "ProcessStepName",
                table: "TimeSheets",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("f4c7de49-4344-4fab-8bd8-fce9827e8f68"), null, new DateTimeOffset(new DateTime(2024, 10, 24, 10, 42, 58, 116, DateTimeKind.Unspecified).AddTicks(7693), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "2S2NbSZA7nc1oFPn1SbQyXBDm+1cyDdobkm1Zh2XyHE=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 24, 5, 27, 58, 116, DateTimeKind.Unspecified).AddTicks(7787), new TimeSpan(0, 0, 0, 0, 0)), "LYwHxCpJxbefHukLqjy/Qg==", (byte)1 });
        }
    }
}
