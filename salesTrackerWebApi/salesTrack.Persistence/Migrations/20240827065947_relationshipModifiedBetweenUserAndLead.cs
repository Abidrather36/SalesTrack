using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class relationshipModifiedBetweenUserAndLead : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leads_Users_AssignTo",
                table: "Leads");

            migrationBuilder.DropIndex(
                name: "IX_Leads_AssignTo",
                table: "Leads");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("2535e498-876c-4cc5-9886-c734a3469aa1"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("93de942e-e4e3-40c7-97a7-0428d770ca54"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "gogSRQkBljjzH7MUE1C9vYyZiTRf98otPQayCWLtn38=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 27, 7, 14, 44, 856, DateTimeKind.Unspecified).AddTicks(1251), new TimeSpan(0, 0, 0, 0, 0)), "59umvQT0hwdePKStu+CceA==", (byte)1, (byte)0 });

            migrationBuilder.AddForeignKey(
                name: "FK_Leads_Users_Id",
                table: "Leads",
                column: "Id",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leads_Users_Id",
                table: "Leads");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("93de942e-e4e3-40c7-97a7-0428d770ca54"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("2535e498-876c-4cc5-9886-c734a3469aa1"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "7w6yj2AQ3lybTnl8dykS7irDWuA0ltzFBOjuyxmGUbU=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 27, 5, 54, 19, 136, DateTimeKind.Unspecified).AddTicks(7843), new TimeSpan(0, 0, 0, 0, 0)), "AveKWRI29Wj5HwEzHhJmIg==", (byte)1, (byte)0 });

            migrationBuilder.CreateIndex(
                name: "IX_Leads_AssignTo",
                table: "Leads",
                column: "AssignTo",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Leads_Users_AssignTo",
                table: "Leads",
                column: "AssignTo",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
