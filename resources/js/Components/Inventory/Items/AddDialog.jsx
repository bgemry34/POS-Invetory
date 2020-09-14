import { Dialog, DialogTitle, DialogContent, Container, FormControl, TextField, MenuItem, InputLabel, Input, InputAdornment, Typography, DialogActions, Button } from '@material-ui/core';
import { error } from 'console';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react'

function AddDialog() {
    return (
        <div>
          <form onSubmit={createItem} method="post">
          <DialogTitle className="mt-2">Add Item</DialogTitle>
          <DialogContent>
            <Container>
                <FormControl margin="normal" fullWidth>
                  <TextField required
                  ref={topRef}
                  name="Name" 
                  id="standard-required" 
                  defaultValue={isEdit ? form.Name : ''}
                  label="Name"
                  error={error.Name && true}
                  helperText={error.Name}
                  onChange={handleChange}
                  fullWidth
                  />
                  <TextField required
                  name="Description"
                  multiline
                  rows={4}
                  id="standard-required" 
                  defaultValue={isEdit ? form.Description : ''}
                  label="Description"
                  error={error.Description && true}
                  helperText={error.Description}
                  onChange={handleChange}
                  fullWidth
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <TextField
                  select
                  margin="normal"
                  label="Category"
                  name="Category"
                  value={form.Category}
                  onChange={handleChange}
                  error={error.Category && true}
                  helperText={error.Category}
                  fullWidth
                  >
                    <MenuItem value={' '}>
                          {'--Select Category--'}
                    </MenuItem>
                    {categories.length >0  && categories.map(category=>(
                      <MenuItem key={category.id} value={category.id}>
                          {category.Name}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                  <Input
                    required
                    value={form.Price}
                    name="Price"
                    error={error.Price && true}
                    onChange={handleChange}
                    startAdornment={<InputAdornment position="start">	&#8369;</InputAdornment>}
                  />
                </FormControl >
                <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="standard-adornment-amount">Sell Price</InputLabel>
                <Input
                  required
                  name="SellPrice"
                  value={form.SellPrice}
                  error={error.SellPrice && true}
                  onChange={handleChange}
                  startAdornment={<InputAdornment position="start">	&#8369;</InputAdornment>}
                />
                </FormControl >
                {isEdit ? (<React.Fragment></React.Fragment>):(
                  <FormControl margin="normal" fullWidth>
                  <TextField
                  select
                  label="Supplier"
                  name="Supplier"
                  value={form.Supplier}
                  error={error.Supplier && true}
                  helperText={error.Supplier}
                  onChange={handleChange}
                  fullWidth
                  >
                      <MenuItem value={' '}>
                            {'--Select Supplier--'}
                      </MenuItem>
                      {
                        suppliers.map(supplier=>(
                          <MenuItem key={supplier.id} value={supplier.id}>
                              {supplier.Name}
                          </MenuItem>
                        ))
                      }
                  </TextField>
                </FormControl>
                )}
                <FormControl margin="normal" fullWidth>
                  <TextField
                    required
                    name="Qty"
                    defaultValue={isEdit ? form.Qty : '1'}
                    label="Qty"
                    type="number"
                    error={error.Qty && true}
                    helperText={error.Qty}
                    onChange={handleChange}
                    
                    variant="filled"
                    fullWidth
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <Typography variant="body2" component="h2">
                    Images:
                  </Typography>
                  <DropzoneArea
                    acceptedFiles={['image/*']}
                    initialFiles={isEdit && form.Images.length > 0 ? (form.Images.map(image=>{
                      return 'http://posinventory.test/storage/ItemImages/' + image.image;
                    })): []}
                    dropzoneText={"Drag and drop an image here or click"}
                    onChange={(files) => {setForm({...form, Images:files})}}
                    filesLimit={5}
                    onDelete={(e)=>destroyImage(e)}
                    showAlerts={['error', 'info']}
                    maxFileSize={1999999}
                    previewGridClasses={{container: {spacing:3}}}
                  />
                </FormControl>
            </Container>
          </DialogContent>
          <DialogActions>
            <Container>
              {isEdit ? (
                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={'bg-success float-right mb-2'}
                endIcon={<SaveOutlinedIcon />}
                size="large"
                type="submit"
                >
                  Save
                </Button>
              ):
              (
              <Button
              type="submit"
              variant="contained"
              color="primary"
              className={'bg-success float-right mb-2'}
              endIcon={<AddIcon />}
              size="large"
              type="submit"
              >
                Add
              </Button>
              )}
              
            </Container>
          </DialogActions>
          </form>
        </div>
    )
}

export default AddDialog
