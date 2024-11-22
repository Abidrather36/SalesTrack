using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace salesTrack.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SeventhMig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Check if the index already exists, and create it only if it doesn't
            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_FollowUpDates_LeadCompanyId' AND object_id = OBJECT_ID('FollowUpDates'))
                BEGIN
                    CREATE INDEX IX_FollowUpDates_LeadCompanyId ON FollowUpDates (LeadCompanyId);
                END
            ");

            // Check if the foreign key constraint already exists before adding it
            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_FollowUpDates_LeadCompanies_LeadCompanyId')
                BEGIN
                    ALTER TABLE FollowUpDates
                    ADD CONSTRAINT FK_FollowUpDates_LeadCompanies_LeadCompanyId FOREIGN KEY (LeadCompanyId) REFERENCES LeadCompanies(Id) ON DELETE SET NULL;
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Check if the foreign key constraint exists and drop it
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_FollowUpDates_LeadCompanies_LeadCompanyId')
                BEGIN
                    ALTER TABLE FollowUpDates
                    DROP CONSTRAINT FK_FollowUpDates_LeadCompanies_LeadCompanyId;
                END
            ");

            // Check if the index exists and drop it
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_FollowUpDates_LeadCompanyId' AND object_id = OBJECT_ID('FollowUpDates'))
                BEGIN
                    DROP INDEX IX_FollowUpDates_LeadCompanyId ON FollowUpDates;
                END
            ");
        }
    }
}
