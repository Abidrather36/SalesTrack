import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

// Reusable Breadcrumb Component
function IconBreadcrumbs({ items, onClick }) {
  return (
    <div role="presentation" onClick={onClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {items.map((item, index) =>
          item.href ? (
            <Link
              key={index}
              underline="hover"
              style={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href={item.href}
            >
              <item.icon style={{ marginRight: 4 }} fontSize="inherit" />
              {item.label}
            </Link>
          ) : (
            <Typography
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.primary',
              }}
            >
              <item.icon style={{ marginRight: 4 }} fontSize="inherit" />
              {item.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </div>
  );
}

export default IconBreadcrumbs;
