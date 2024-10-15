using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangedNavigation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("870d5838-0a0f-4267-957f-89fcdd19ec11"));

            migrationBuilder.AddColumn<Guid>(
                name: "LeadProcessStepId",
                table: "LeadComments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "Time",
                table: "FollowUpDates",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<Guid>(
                name: "LeadProcessStepId",
                table: "FollowUpDates",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("371869a4-99ed-49ff-8d4d-794486f511ce"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "0ZxvzBE6PcMArdnfMLorernffIUyjn5N1jddZB80o8E=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 14, 5, 59, 4, 287, DateTimeKind.Unspecified).AddTicks(6414), new TimeSpan(0, 0, 0, 0, 0)), "tz/klzjpTrGA1ma+2FcxGw==", (byte)1 });

            migrationBuilder.CreateIndex(
                name: "IX_LeadComments_LeadProcessStepId",
                table: "LeadComments",
                column: "LeadProcessStepId");

            migrationBuilder.CreateIndex(
                name: "IX_FollowUpDates_LeadProcessStepId",
                table: "FollowUpDates",
                column: "LeadProcessStepId");

            migrationBuilder.AddForeignKey(
                name: "FK_FollowUpDates_LeadProcessSteps_LeadProcessStepId",
                table: "FollowUpDates",
                column: "LeadProcessStepId",
                principalTable: "LeadProcessSteps",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LeadComments_LeadProcessSteps_LeadProcessStepId",
                table: "LeadComments",
                column: "LeadProcessStepId",
                principalTable: "LeadProcessSteps",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FollowUpDates_LeadProcessSteps_LeadProcessStepId",
                table: "FollowUpDates");

            migrationBuilder.DropForeignKey(
                name: "FK_LeadComments_LeadProcessSteps_LeadProcessStepId",
                table: "LeadComments");

            migrationBuilder.DropIndex(
                name: "IX_LeadComments_LeadProcessStepId",
                table: "LeadComments");

            migrationBuilder.DropIndex(
                name: "IX_FollowUpDates_LeadProcessStepId",
                table: "FollowUpDates");

            migrationBuilder.DeleteData(
                table: "MasterUsers",
                keyColumn: "Id",
                keyValue: new Guid("371869a4-99ed-49ff-8d4d-794486f511ce"));

            migrationBuilder.DropColumn(
                name: "LeadProcessStepId",
                table: "LeadComments");

            migrationBuilder.DropColumn(
                name: "LeadProcessStepId",
                table: "FollowUpDates");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Time",
                table: "FollowUpDates",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.InsertData(
                table: "MasterUsers",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ResetCode", "ResetExpiry", "Salt", "UserRole" },
                values: new object[] { new Guid("870d5838-0a0f-4267-957f-89fcdd19ec11"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "WZtmbaeK/FqjIM9WDe5/VQ4IlxkIHV0yQ7QrcKnVfbU=", "6545454543", 12345, new DateTimeOffset(new DateTime(2024, 10, 4, 5, 33, 34, 198, DateTimeKind.Unspecified).AddTicks(5262), new TimeSpan(0, 0, 0, 0, 0)), "UGh6xuYb069Wq8WxNMvj2w==", (byte)1 });
        }
    }
}
