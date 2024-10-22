using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class TimeSheetAdded3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeSheets_Users_SalesExecutiveId",
                table: "TimeSheets");

            migrationBuilder.DropIndex(
                name: "IX_TimeSheets_SalesExecutiveId",
                table: "TimeSheets");

            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("7d6dc953-90f5-4674-8128-c807b360711d"));

            migrationBuilder.AlterColumn<Guid>(
                name: "SalesExecutiveId",
                table: "TimeSheets",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("2e1dc1c6-c01b-44f5-bdef-8339c33a308d"), null, new DateTimeOffset(new DateTime(2024, 10, 22, 16, 49, 27, 766, DateTimeKind.Unspecified).AddTicks(3815), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "r+uqpqfVVBkeMRMdUNNIs71CkdIY2W1iq2dAWhxw2LA=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 22, 11, 34, 27, 766, DateTimeKind.Unspecified).AddTicks(3881), new TimeSpan(0, 0, 0, 0, 0)), "VsC6GwNajLMdqvvUmgD+HQ==", (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_TimeSheets_SalesExecutiveId",
                table: "TimeSheets",
                column: "SalesExecutiveId",
                unique: true,
                filter: "[SalesExecutiveId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeSheets_Users_SalesExecutiveId",
                table: "TimeSheets",
                column: "SalesExecutiveId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeSheets_Users_SalesExecutiveId",
                table: "TimeSheets");

            migrationBuilder.DropIndex(
                name: "IX_TimeSheets_SalesExecutiveId",
                table: "TimeSheets");

            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("2e1dc1c6-c01b-44f5-bdef-8339c33a308d"));

            migrationBuilder.AlterColumn<Guid>(
                name: "SalesExecutiveId",
                table: "TimeSheets",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("7d6dc953-90f5-4674-8128-c807b360711d"), null, new DateTimeOffset(new DateTime(2024, 10, 22, 16, 36, 22, 889, DateTimeKind.Unspecified).AddTicks(7888), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "1zPGgxVfCFpjw9anSZ8YTtcLzFJavtjwCU90uZ9VLBA=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 22, 11, 21, 22, 889, DateTimeKind.Unspecified).AddTicks(7956), new TimeSpan(0, 0, 0, 0, 0)), "zS4SpxtZ8l45emySpuHnwQ==", (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_TimeSheets_SalesExecutiveId",
                table: "TimeSheets",
                column: "SalesExecutiveId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeSheets_Users_SalesExecutiveId",
                table: "TimeSheets",
                column: "SalesExecutiveId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
