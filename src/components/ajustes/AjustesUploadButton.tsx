import { Button, styled } from "@mui/material";
import { IUseAjuste } from "../../hooks/useAjustePorAgregador";
const Input = styled('input')({
  display: 'none',
});

export default function AjustesUploadButton({ actions }: { actions: IUseAjuste }) {

  const handleChange = (event: any) => {
    const arquivo =  event.target.files[0]
    actions.handleImportarExcel(arquivo)
  }
  return (
    <>
      <label htmlFor="contained-button-file">
        <Input accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        id="contained-button-file" onChange={handleChange} type="file" />
        <Button
          disabled={ actions.isActive == 0}
        component="span">
          Upload
        </Button>
      </label>
    </>
  )
}
