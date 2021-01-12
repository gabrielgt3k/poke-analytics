import React, { useState, useEffect, useCallback } from 'react';
import { Pagination, DataTableSkeleton, Tile } from 'carbon-components-react';
import CapturesByType from './components/CapturesByType';
import CapturesByRegion from './components/CapturesByRegion';
import api from './services/api';
import pokeApi from './services/pokeApi';
import PokeTable from './components/PokeTable';
import IChartData from './shared/interfaces/IChartData.interface';
import IPokemon from './shared/interfaces/IPokemon.interface';
import './app.scss';

interface ICaptures {
  id: string;
  pokemonId?: number;
  type: string;
  region: string;
}

interface IBattleTeam {
  pokedexNumber: number;
}

const App: React.FC = () => {
  const [captures, setCaptures] = useState<ICaptures[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [chartByType, setChartByType] = useState<IChartData[]>([]);
  const [chartByRegion, setChartByRegion] = useState<IChartData[]>([]);
  const [battleTeam, setBattleTeam] = useState<IPokemon[]>([]);

  const getRowItems = useCallback(
    (rows: Array<ICaptures>): Array<ICaptures> => {
      return rows.map(row => ({
        ...row,
        id: String(row.pokemonId),
      }));
    },
    [],
  );

  useEffect(() => {
    async function loadInitialCaptures() {
      try {
        setLoading(true);
        const response = await api.get('/captures');
        const rows = getRowItems(response.data);
        setTotalItems(rows.length);
        setCaptures(rows);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    async function loadInitialChartData() {
      try {
        const response = await api.get('/reports');
        const { data } = response;

        const preparedDataByType = Object.keys(data.capturesByType).map(key => {
          const record = {
            group: key,
            value: data.capturesByType[key],
          };

          return record;
        });

        const preparedDataByRegion = Object.keys(data.capturesByRegion).map(
          key => {
            const record = {
              group: key,
              value: data.capturesByRegion[key],
            };

            return record;
          },
        );

        setChartByType(preparedDataByType);
        setChartByRegion(preparedDataByRegion);
      } catch (error) {
        console.error(error);
      }
    }

    async function loadBattleTeam() {
      try {
        const response = await api.get<IBattleTeam[]>('/battle_team');
        const { data } = response;
        const promises = data.map(async row => {
          return pokeApi.get(`/${row.pokedexNumber}`);
        });

        const res = await Promise.all(promises);

        const newBattleTeam = res.map(pokeApiResponse => {
          const newPokemon = {
            name: pokeApiResponse.data.name,
            photo: pokeApiResponse.data.sprites.front_default,
          };

          return newPokemon;
        });

        setBattleTeam(newBattleTeam);
      } catch (error) {
        console.error(error);
      }
    }
    loadInitialCaptures();
    loadInitialChartData();
    loadBattleTeam();
  }, [getRowItems]);

  const headers = [
    {
      key: 'pokemonId',
      header: 'Pokemon ID',
    },
    {
      key: 'type',
      header: 'Tipo',
    },
    {
      key: 'region',
      header: 'Região',
    },
  ];
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--offset-lg-5 bx--col-lg-4 bx--offset-md-4 bx--col-md-4 bx--col-sm-4">
          <h1>PoKéAnalytics</h1>
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--col">
          {loading ? (
            <DataTableSkeleton
              columnCount={headers.length + 1}
              rowCount={10}
              showToolbar={false}
            />
          ) : (
            <>
              <PokeTable
                headersProp={headers}
                rowsProp={captures.slice(
                  firstRowIndex,
                  firstRowIndex + currentPageSize,
                )}
              />
              <Pagination
                totalItems={totalItems}
                backwardText="Página anterior"
                forwardText="Próx página"
                pageSize={currentPageSize}
                pageSizes={[5, 10, 15, 25]}
                itemsPerPageText="Pokémons por página"
                onChange={({ page, pageSize }) => {
                  if (pageSize !== currentPageSize) {
                    setCurrentPageSize(pageSize);
                  }
                  setFirstRowIndex(pageSize * (page - 1));
                }}
              />
            </>
          )}
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--col">
          <CapturesByType data={chartByType} />
        </div>
        <div className="bx--col">
          <CapturesByRegion data={chartByRegion} />
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--offset-lg-4 bx--col-lg">
          <h3>Seu time atual de batalha💪</h3>
        </div>
      </div>
      <div className="bx--row">
        {battleTeam.map(teamMate => (
          <div key={teamMate.name} className="bx--col">
            <Tile>
              <img src={teamMate.photo} alt="Pokemon" />
              <span className="bx--type-semibold">{teamMate.name}</span>
            </Tile>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
