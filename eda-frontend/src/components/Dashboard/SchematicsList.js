import React, { useEffect } from 'react'
import {
  Card,
  Grid,
  Button,
  Typography,
  CardActions,
  CardContent,
  Input
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link as RouterLink } from 'react-router-dom'
import SchematicCard from './SchematicCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSchematics } from '../../redux/actions/index'

const useStyles = makeStyles({
  mainHead: {
    width: '100%',
    backgroundColor: '#404040',
    color: '#fff'
  },
  title: {
    fontSize: 14,
    color: '#80ff80'
  }
})

// Card displaying user my schematics page header.
function MainCard() {
  const classes = useStyles()

  return (
    <Card className={classes.mainHead}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          All schematics are Listed Below
        </Typography>
        <Typography variant="h5" component="h2">
          My Schematics
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          target="_blank"
          component={RouterLink}
          to="/editor"
          size="small"
          color="primary"
        >
          Create New
        </Button>
        <Button size="small" color="secondary">
          Load More
        </Button>
      </CardActions>
    </Card>
  )
}

export default function SchematicsList() {
  const classes = useStyles()
  const auth = useSelector(state => state.authReducer)
  const schematics = useSelector(state => state.dashboardReducer.schematics)
  const [saves, setSaves] = React.useState(null)
  const dispatch = useDispatch()

  // For Fetching Saved Schematics
  useEffect(() => {
    dispatch(fetchSchematics())
  }, [dispatch])
  const onSearch = (e) => {
    setSaves(schematics.filter((o) =>
      Object.keys(o).some((k) => {
        if ((k === 'name' || k === 'description' || k === 'owner' || k === 'save_time' || k === 'create_time') && String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())) {
          return String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        }
      }
      )
    ))
    console.log(schematics.filter((o) =>
    Object.keys(o).some((k) => {
      if ((k === 'name' || k === 'description' || k === 'owner' || k === 'save_time' || k === 'create_time') && String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())) {
        return String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
      }
    }
    )
  ))
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        alignContent="center"
        spacing={3}
      >
        {/* User Dashboard My Schematic Header */}
        <Grid item xs={12}>
          <MainCard />
        </Grid>
        <Grid item xs={12}>
          {schematics && <Input style={{ float: 'right' }} onChange={(e) => onSearch(e)} placeholder='Search' /> }
        </Grid>
        {/* List all schematics saved by user */}
        {saves ?
          <>
            {saves.length !== 0
              ? <>
                {saves.map(
                  (sch) => {
                    return (
                      <Grid item xs={12} sm={6} lg={3} key={sch.save_id}>
                        <SchematicCard sch={sch} />
                      </Grid>
                    )
                  }
                )}
              </>
              : <Grid item xs={12}>
                <Card style={{ padding: '7px 15px' }} className={classes.mainHead}>
                  <Typography variant="subtitle1" gutterBottom>
                    Hey {auth.user.username} , You dont have any saved schematics...
                  </Typography>
                </Card>
              </Grid>
            }
          </> :
          <>
            {schematics.length !== 0
              ? <>
                {schematics.map(
                  (sch) => {
                    return (
                      <Grid item xs={12} sm={6} lg={3} key={sch.save_id}>
                        <SchematicCard sch={sch} />
                      </Grid>
                    )
                  }
                )}
              </>
              : <Grid item xs={12}>
                <Card style={{ padding: '7px 15px' }} className={classes.mainHead}>
                  <Typography variant="subtitle1" gutterBottom>
                    Hey {auth.user.username} , You dont have any saved schematics...
                  </Typography>
                </Card>
              </Grid>
            }
          </>}

      </Grid>
    </>
  )
}
