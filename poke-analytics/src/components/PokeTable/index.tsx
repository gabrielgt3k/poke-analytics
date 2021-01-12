/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  DataTableHeader,
  DataTableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Modal,
  Tag,
  TagTypeName,
} from 'carbon-components-react';
import pokeApi from '../../services/pokeApi';
import IPokemon from '../../shared/interfaces/IPokemon.interface';
import './_modal.scss';

interface PokeTableProps {
  rowsProp: Array<DataTableRow>;
  headersProp: Array<DataTableHeader>;
}

interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
interface IPokemonAbility {
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

const PokeTable: React.FC<PokeTableProps> = ({ rowsProp, headersProp }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pokemonModal, setPokemonModal] = useState<IPokemon>({} as IPokemon);

  const updatePokemon = useCallback(
    async (pokemonId: string): Promise<void> => {
      setLoading(true);
      const response = await pokeApi.get(`/${pokemonId}`);
      const { data } = response;
      const pokemon = {
        pokedexNumber: Number(pokemonId),
        name: data.name,
        weight: data.weight,
        photo: data.sprites.front_default,
        types: data.types.map(
          (pokemonType: IPokemonType) => pokemonType.type.name,
        ),
        abilities: data.abilities.map(
          (pokemonAbility: IPokemonAbility) => pokemonAbility.ability.name,
        ),
      };

      setPokemonModal(pokemon);
      setLoading(false);
    },
    [],
  );

  const colorTypeTags = useCallback((type: string): TagTypeName => {
    switch (type) {
      case 'bug':
      case 'grass':
        return 'green';
      case 'fairy':
      case 'psychic':
        return 'magenta';
      case 'ghost':
      case 'dragon':
      case 'flying':
        return 'blue';
      case 'fire':
        return 'red';
      case 'water':
      case 'ice':
        return 'teal';
      default:
        return 'cool-gray';
    }
  }, []);

  return (
    <>
      <DataTable
        rows={rowsProp}
        headers={headersProp}
        isSortable
        render={({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
          onInputChange,
        }) => (
          <TableContainer
            title="Aqui estão todas as suas capturas 😍"
            description="Clique em um registro da tabela para ver mais informações sobre seu Pokémon."
          >
            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
              </TableToolbarContent>
            </TableToolbar>

            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    {...getRowProps({ row })}
                    onClick={() => {
                      setOpen(true);
                      updatePokemon(rowsProp[index].id);
                    }}
                  >
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
      {open && (
        <Modal
          passiveModal
          modalHeading={`Pokémon número #${pokemonModal.pokedexNumber}`}
          onRequestClose={() => setOpen(false)}
          open={open}
          size="sm"
          hasForm
        >
          {!loading && (
            <div className="bx--grid">
              <div className="bx--row">
                <div className="bx--offset-md-8 bx--col-md-8">
                  <div className="modal__photo-container">
                    <img
                      className="modal__photo"
                      src={pokemonModal.photo}
                      alt="Pokemon"
                    />
                    <h3>{pokemonModal.name}</h3>
                  </div>
                </div>
              </div>
              <div className="bx-row">
                <div className="bx--col-md data-container">
                  <div>
                    <strong>Tipo: </strong>
                    {pokemonModal.types?.map(type => (
                      <Tag
                        type={colorTypeTags(type)}
                        key={pokemonModal.pokedexNumber}
                      >
                        {type}
                      </Tag>
                    ))}
                  </div>
                  <div>
                    <strong>Peso: </strong>
                    <span>{pokemonModal.weight}</span>
                  </div>
                  <div>
                    <strong>Golpes básicos: </strong>
                    {pokemonModal.abilities?.map(ability => (
                      <Tag type="gray" key={pokemonModal.pokedexNumber}>
                        {ability}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default PokeTable;
