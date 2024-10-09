// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Card({ props }) {
//   return (
//     <main className="py-6 bg-surface-secondary">
//       <div className="container-fluid">
//         <div className="row g-6 mb-6">
//           {props.map((prop, index) => (
//             <div key={index} className="col-xl-4 col-sm-6 col-12">
//              <Link to={prop.link || '#'} className="text-decoration-none"/> {/* Add Link here */}
//               <div className="card shadow border-0">
//                 <div className="card-body">
//                   <div className="row">
//                     <div className="col">
//                       <span className="h6 font-semibold text-muted text-sm d-block mb-2">
//                         {prop.title}
//                       </span>
//                       <span className="h3 font-bold mb-0">{prop.number}</span>
//                     </div>
//                     <div className="col-auto">
//                       <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
//                         {prop.icon}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ props }) { 
  

  return (
    <main className="py-6 bg-surface-secondary">
      <div className="container-fluid">
        <div className="row g-6 mb-6">
          {props.map((prop, index) => (
            <div key={index} className="col-xl-4 col-sm-6 col-12">
              {prop.link ? ( 
                <Link to={prop.link} className="text-decoration-none">
                  <div className="card shadow border-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                            {prop.title}
                          </span>
                          <span className="h3 font-bold mb-0">{prop.number}</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                            {prop.icon}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="card shadow border-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                          {prop.title}
                        </span>
                        <span className="h3 font-bold mb-0">{prop.number}</span>
                      </div>
                      <div className="col-auto">
                        <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                          {prop.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
