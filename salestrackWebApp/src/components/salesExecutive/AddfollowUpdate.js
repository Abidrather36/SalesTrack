import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Margin, TroubleshootTwoTone } from "@mui/icons-material";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { addFollowUpdate, addLeadComment, addLeadProcessStep } from "../../Services/LeadService";
import myToaster from "../../utils/toaster";
import { getAllProcessSteps } from "../../Services/UserService";
import { useEffect } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ leadData, onClose }) {
  console.log(leadData);
  const [open, setOpen] = useState(TroubleshootTwoTone);
  const handleOpen = () => setOpen(true);
  const [showList, setShowList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processSteps, setProcessSteps] = useState([]);


  useEffect(() => {
    fetchProcessSteps();
  }, []);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };
 
  

  const { register, handleSubmit, formState: errors } = useForm();
  const fetchProcessSteps = async () => {
    try {
      const response = await getAllProcessSteps();
      setProcessSteps(response.result);
    } catch (error) {
      myToaster.showErrorToast("Failed to fetch process steps.");
    }
  };
  const onSubmit = async (data) => {
    const followUpPayload = {
      date: data.date,
      time: `${data.time}:00`,
      leadId: leadData?.id,             
    };
  
    const processStep = {
      leadId: leadData?.id,             
      adminProcessStepId: data.adminProcessStepId,   
      stepDescription:  "sss",         
    };
  
    const comment = {
      text: data.comments || "", 
      leadId: leadData?.id,  
    };

    console.log(followUpPayload)
    console.log(processStep)
    console.log(comment)

   
    setLoading(true);

    try {
      const responseOne = await addFollowUpdate(followUpPayload);
      
      if (responseOne.isSuccess) {
          const responseTwo = await addLeadProcessStep(processStep); 
          console.log(responseTwo)
          
          if (responseTwo.isSuccess) {
              const responseThree = await addLeadComment(comment);

              if (responseThree.isSuccess) {
                  myToaster.showSuccessToast("data updated successfully")
                  handleClose();
                  
              } else {
                  myToaster.showErrorToast(responseThree.message);
              }
          } else {
              myToaster.showErrorToast(responseTwo.message);
          }
      } else {
          myToaster.showErrorToast(responseOne.message);
      }
  } catch (error) {
      myToaster.showErrorToast('Something went wrong,try again:', error);
  } finally {
    setLoading(false)
  }
  
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Modal Title */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Manage Lead
          </Typography>

          {/* Form Fields */}
          <Box
            component="form"
            sx={{ mt: 2 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Date Picker */}
            <TextField
              id="date"
              label="Follow-Up Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("date", { required: true })}
              error={Boolean(errors.date)}
              helperText={errors.date ? "Follow-up date is required" : ""}
              fullWidth
              sx={{ mb: 2 }}
            />

            {/* Time Picker */}
            <TextField
              id="time"
              label="Follow-Up Time"
              type="time"
              InputLabelProps={{ shrink: true }}
              {...register("time", { required: true })}
              error={Boolean(errors.time)}
              helperText={errors.time ? "Follow-up time is required" : ""}
              fullWidth
              sx={{ mb: 2 }}
            />

            {/* Process Step Dropdown */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="process-step-label">Process Step</InputLabel>
              <Select
                labelId="process-step-label"
                id="adminProcessStepId"
                label="Process Step"
                {...register("adminProcessStepId", { required: true })}
                error={Boolean(errors.adminProcessStepId)}
              >
              
                 {processSteps.map((step) => (
                     
                      <MenuItem key={step.id} value={step.id}>{step.stepName}</MenuItem>
                    ))}
              
              </Select>
              {errors.adminProcessStepId && (
                <FormHelperText error>
                  {errors.adminProcessStepId.message}
                </FormHelperText>
              )}
            </FormControl>

            {/* Comments Text Area */}
            <TextField
              id="comments"
              label="Comments"
              multiline
              rows={4}
              {...register("comments", { required: false })}
              fullWidth
              sx={{ mb: 2 }}
            />

            {/* Action Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button
                variant="outlined"
                color="white"
                onClick={handleClose}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
