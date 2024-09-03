using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SomeChangestoProcessStep : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeadProcessSteps_AdminProcessSteps_ProcessStepId",
                table: "LeadProcessSteps");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("2c8b90c0-d5ee-40de-8557-ef146b53d763"));

            migrationBuilder.RenameColumn(
                name: "ProcessStepId",
                table: "LeadProcessSteps",
                newName: "AdminProcessStepId");

            migrationBuilder.RenameIndex(
                name: "IX_LeadProcessSteps_ProcessStepId",
                table: "LeadProcessSteps",
                newName: "IX_LeadProcessSteps_AdminProcessStepId");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("8d09171c-9cd4-4766-8d4d-04f77e9856e1"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "g8cU2sReTyVSg+qxAmf3rflWyhJBk8c23bVlngvl8kg=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 9, 3, 7, 12, 16, 79, DateTimeKind.Unspecified).AddTicks(3206), new TimeSpan(0, 0, 0, 0, 0)), "aNvr18p5KsUIMZR77JO/pg==", (byte)1, (byte)0 });

            migrationBuilder.AddForeignKey(
                name: "FK_LeadProcessSteps_AdminProcessSteps_AdminProcessStepId",
                table: "LeadProcessSteps",
                column: "AdminProcessStepId",
                principalTable: "AdminProcessSteps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeadProcessSteps_AdminProcessSteps_AdminProcessStepId",
                table: "LeadProcessSteps");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("8d09171c-9cd4-4766-8d4d-04f77e9856e1"));

            migrationBuilder.RenameColumn(
                name: "AdminProcessStepId",
                table: "LeadProcessSteps",
                newName: "ProcessStepId");

            migrationBuilder.RenameIndex(
                name: "IX_LeadProcessSteps_AdminProcessStepId",
                table: "LeadProcessSteps",
                newName: "IX_LeadProcessSteps_ProcessStepId");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("2c8b90c0-d5ee-40de-8557-ef146b53d763"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "MjLl1GAHfNa467vOHVezMRRMCyGFkHd1l+KyJ5GzGD8=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 30, 5, 46, 47, 23, DateTimeKind.Unspecified).AddTicks(3812), new TimeSpan(0, 0, 0, 0, 0)), "S9X2dMsuG7i5MzDYcqhx1w==", (byte)1, (byte)0 });

            migrationBuilder.AddForeignKey(
                name: "FK_LeadProcessSteps_AdminProcessSteps_ProcessStepId",
                table: "LeadProcessSteps",
                column: "ProcessStepId",
                principalTable: "AdminProcessSteps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
