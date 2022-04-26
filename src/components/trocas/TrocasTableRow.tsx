import { Button, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { Troca } from "../../core/model/troca/Trocas";
import { IUseRelatorioTrocas } from "../../hooks/useRelatorioTrocas";
import NumberTextFormat from "../../utils/NumberTextFormat";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import Link from "next/link";
export default function TrocasTableRow({ row, actions }: { row: Troca, actions: IUseRelatorioTrocas }) {
  if (actions)
  return (
    <TableRow
      hover={true}
      onClick={()=> actions.handleSelecionaLinha(row)}
      selected={actions.selectedId === row.id}
    >
      <TableCell padding='none' align='right' colSpan={2} sx={{ paddingLeft: '8px' ,fontWeight: 'bold', color: 'purple' }}>
        {row.id}
      </TableCell>

      <TableCell padding="none" align="left">
        <Link href={`/relatorio/${actions.relatorio?.agregador.id}/${row.produtoId}`} passHref>
          <Button color="primary" size="small"> {row.produto.nome}</Button>
        </Link>
      </TableCell>

      <TableCell align="left" >
        {row.incrementa.nome}
      </TableCell>

      <TableCell padding="none" align="left">
        {row.reduz.nome}
      </TableCell>

      <TableCell align="right"
        sx={{ fontWeight: 'bold' }}
      >
        <NumberTextFormat value={row.valor} />
      </TableCell>

      <TableCell align="center"
        sx={{ paddingLeft: '5px', fontWeight: 'italic', color: 'gray' }}
      >

        <Tooltip title={row.criador?.nome || ''} placement="left">
          <small>{row.criadoUserId}</small>
        </Tooltip>
      </TableCell>

      <TableCell padding="none"  align="center" >


        {row.status == 'Criada' && actions.relatorio?.agregador.tipo !== 'SR' ?
          <Tooltip title={"Aguardando homologação"} placement="left" >
        <ThumbsUpDownIcon fontSize="small" color="warning"></ThumbsUpDownIcon>
        </Tooltip>
        : <></>}
        {row.status == 'Homologada' ?
          <Tooltip title={`Homologado por ${row.homologador?.nome} `} placement="left" >
        <ThumbUpIcon fontSize="small" color="success"></ThumbUpIcon>
        </Tooltip>
         :<></> }
        {row.status == 'Cancelada' ?
          <Tooltip title={`Cancelado por ${row.homologador?.nome} `} placement="left" >
        <ThumbDownIcon fontSize="small" color="error"></ThumbDownIcon>
          </Tooltip>
        : <></>}

        {row.status == 'Criada' && actions.relatorio?.agregador.tipo == 'SR' ? (
          <IconButton
            onClick={() => actions.handleHomologarTroca(row)}
          >
            <Tooltip title={"Homologar negociação"} placement="left" >
              <ThumbUpOffAltIcon fontSize="small" color="success"></ThumbUpOffAltIcon>
            </Tooltip>
          </IconButton>
        )
          : <></>
        }

        {row.status !== 'Cancelada' && actions.relatorio?.agregador.tipo == 'SR' ? (
              <IconButton
                onClick={()=>actions.handleCancelarTroca(row)}
              >
                <Tooltip title={"Cancelar negociação"} placement="left" >
                  <ThumbDownOffAltIcon fontSize="small" color="error"></ThumbDownOffAltIcon>
                </Tooltip>
              </IconButton>
              )
              :<></>
          }

      </TableCell>
    </TableRow>
  )

  return <></>
}
