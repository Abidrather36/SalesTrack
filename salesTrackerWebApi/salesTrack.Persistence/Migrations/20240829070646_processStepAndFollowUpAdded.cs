using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class processStepAndFollowUpAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("df061bfa-74b5-4e6f-b2fd-982286031120"));

            migrationBuilder.AddColumn<Guid>(
                name: "LeadId",
                table: "ProcessSteps",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "FollowUpDates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LeadId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    ModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ModifiedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletedDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FollowUpDates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FollowUpDates_Leads_LeadId",
                        column: x => x.LeadId,
                        principalTable: "Leads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("dbfabf5c-4f45-47d6-b18d-1238dcc35ff3"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "6WGwyUUnNCkedMS5uQxb8fGAzggf7Ae566NsC74jRYM=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 29, 7, 21, 43, 802, DateTimeKind.Unspecified).AddTicks(3094), new TimeSpan(0, 0, 0, 0, 0)), "NsmptQJDErtQ3XoY8SQurQ==", (byte)1, (byte)0 });

            migrationBuilder.CreateIndex(
                name: "IX_ProcessSteps_LeadId",
                table: "ProcessSteps",
                column: "LeadId");

            migrationBuilder.CreateIndex(
                name: "IX_FollowUpDates_LeadId",
                table: "FollowUpDates",
                column: "LeadId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProcessSteps_Leads_LeadId",
                table: "ProcessSteps",
                column: "LeadId",
                principalTable: "Leads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProcessSteps_Leads_LeadId",
                table: "ProcessSteps");

            migrationBuilder.DropTable(
                name: "FollowUpDates");

            migrationBuilder.DropIndex(
                name: "IX_ProcessSteps_LeadId",
                table: "ProcessSteps");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("dbfabf5c-4f45-47d6-b18d-1238dcc35ff3"));

            migrationBuilder.DropColumn(
                name: "LeadId",
                table: "ProcessSteps");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "DeletedBy", "DeletedDate", "Email", "IsActive", "IsPasswordTemporary", "ModifiedBy", "ModifiedDate", "Name", "Password", "PhoneNumber", "ReportsTo", "ResetCode", "ResetExpiry", "Salt", "UserRole", "UserType" },
                values: new object[] { new Guid("df061bfa-74b5-4e6f-b2fd-982286031120"), null, null, null, null, "ramrk@anterntech.com", false, true, null, null, "Ram", "R2pqGFFa8NmrxfOoumZxu2M4w2PHILQgLR00iwUI4B8=", "6545454543", null, 12345, new DateTimeOffset(new DateTime(2024, 8, 28, 8, 45, 58, 23, DateTimeKind.Unspecified).AddTicks(6976), new TimeSpan(0, 0, 0, 0, 0)), "dcB+6gilFcyVARbbM4o4ug==", (byte)1, (byte)0 });
        }
    }
}
