using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class TimeSheetAdded2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeSheet_Users_SalesExecutiveId",
                table: "TimeSheet");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TimeSheet",
                table: "TimeSheet");

            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("54ad4fcb-c3d9-4dc5-9eb0-d35769fd1ff2"));

            migrationBuilder.RenameTable(
                name: "TimeSheet",
                newName: "TimeSheets");

            migrationBuilder.RenameIndex(
                name: "IX_TimeSheet_SalesExecutiveId",
                table: "TimeSheets",
                newName: "IX_TimeSheets_SalesExecutiveId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TimeSheets",
                table: "TimeSheets",
                column: "Id");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("7d6dc953-90f5-4674-8128-c807b360711d"), null, new DateTimeOffset(new DateTime(2024, 10, 22, 16, 36, 22, 889, DateTimeKind.Unspecified).AddTicks(7888), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "1zPGgxVfCFpjw9anSZ8YTtcLzFJavtjwCU90uZ9VLBA=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 22, 11, 21, 22, 889, DateTimeKind.Unspecified).AddTicks(7956), new TimeSpan(0, 0, 0, 0, 0)), "zS4SpxtZ8l45emySpuHnwQ==", (byte)1 });

            migrationBuilder.AddForeignKey(
                name: "FK_TimeSheets_Users_SalesExecutiveId",
                table: "TimeSheets",
                column: "SalesExecutiveId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeSheets_Users_SalesExecutiveId",
                table: "TimeSheets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TimeSheets",
                table: "TimeSheets");

            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("7d6dc953-90f5-4674-8128-c807b360711d"));

            migrationBuilder.RenameTable(
                name: "TimeSheets",
                newName: "TimeSheet");

            migrationBuilder.RenameIndex(
                name: "IX_TimeSheets_SalesExecutiveId",
                table: "TimeSheet",
                newName: "IX_TimeSheet_SalesExecutiveId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TimeSheet",
                table: "TimeSheet",
                column: "Id");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("54ad4fcb-c3d9-4dc5-9eb0-d35769fd1ff2"), null, new DateTimeOffset(new DateTime(2024, 10, 22, 16, 12, 11, 708, DateTimeKind.Unspecified).AddTicks(1039), new TimeSpan(0, 5, 30, 0, 0)), null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "7gebiLq2KhIEZ4WxySPRgKb0XRGnUYh0L7ncvpylfwc=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 22, 10, 57, 11, 708, DateTimeKind.Unspecified).AddTicks(1110), new TimeSpan(0, 0, 0, 0, 0)), "sjNGJXiPLqljLRmVLRI3iQ==", (byte)1 });

            migrationBuilder.AddForeignKey(
                name: "FK_TimeSheet_Users_SalesExecutiveId",
                table: "TimeSheet",
                column: "SalesExecutiveId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
