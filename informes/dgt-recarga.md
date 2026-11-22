# Informe de los datos oficiales de puntos de recarga

Fecha: 2026-11-22T20:20:13.895Z

## DGT (infocar)

- URL: https://infocar.dgt.es/datex2/v3/miterd/EnergyInfrastructureTablePublication/electrolineras.xml
- Respuesta: HTTP 502 · text/html · intento 3
- Tamaño: 0.00 MB · 0.1 s

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
    <head>
        <title>The page is temporarily unavailable</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        
    </head>

    <body>
        <h1><strong>nginx error!</strong></h1>

        <div class="content">

            <h3>The page you are looking for is temporarily unavailable.  Please try again later.</h3>

            <div class="alert">
                <h2>Website Administrator</h2>
                <div class="content">
                    <p>Something has triggered missing webpage on your
                    website. This is the default error page for
                    <strong>nginx</strong> that is distributed with
                    AlmaLinux.  It is located
                    <tt>/usr/share/nginx/html/50x.html</tt></p>

                    <p>You should customize this error page for your own
                    site or edit the <tt>error_page</tt> directive in
                    the <strong>nginx</strong> configuration file
                    <tt>/etc/nginx/nginx.conf</tt>.</p>

                    <p>For information on AlmaLinux, please visit the <a href="http://www.almalinux.org/">AlmaLinux website</a>.</p>

                </div>
            </div>

            <div class="logos">
                <a href="http://nginx.net/"><img
                    src=
…(recortado)
```

## DGT (nap)

- URL: https://nap.dgt.es/datex2/v3/miterd/EnergyInfrastructureTablePublication/electrolineras.xml
- Respuesta: HTTP 200 · text/xml; charset=utf-8 · intento 1
- Tamaño: 80.07 MB · 1.2 s

#### Etiquetas (de más a menos frecuentes)

| Etiqueta | Veces |
|---|---|
| `com:values` | 108875 |
| `com:value` | 108875 |
| `fac:name` | 60290 |
| `locx:addressLine` | 48584 |
| `locx:type` | 48584 |
| `locx:text` | 48584 |
| `egi:connector` | 43205 |
| `egi:connectorType` | 43205 |
| `egi:chargingMode` | 43205 |
| `egi:connectorFormat` | 43205 |
| `egi:maxPowerAtSocket` | 43205 |
| `egi:refillPoint` | 35998 |
| `egi:maximumCurrent` | 34608 |
| `egi:voltage` | 34334 |
| `egi:authenticationAndIdentificationMethods` | 25768 |
| `egi:energyInfrastructureSite` | 12146 |
| `fac:lastUpdated` | 12146 |
| `fac:accessibility` | 12146 |
| `fac:operatingHours` | 12146 |
| `fac:label` | 12146 |
| `fac:overallPeriod` | 12146 |
| `com:overallStartTime` | 12146 |
| `fac:locationReference` | 12146 |
| `loc:_locationReferenceExtension` | 12146 |
| `loc:facilityLocation` | 12146 |
| `locx:address` | 12146 |
| `locx:postcode` | 12146 |
| `loc:coordinatesForDisplay` | 12146 |
| `loc:latitude` | 12146 |
| `loc:longitude` | 12146 |
| `fac:operator` | 12146 |
| `fac:organisationUnit` | 12146 |
| `egi:energyInfrastructureStation` | 12146 |
| `egi:typeOfSite` | 10929 |
| `fac:supplementalFacility` | 1613 |
| `fac:serviceFacilityType` | 1613 |
| `fac:associatedFacility` | 802 |
| `fac:type` | 802 |
| `d2:payload` | 1 |
| `com:feedDescription` | 1 |
| `com:publicationTime` | 1 |
| `com:publicationCreator` | 1 |
| `com:country` | 1 |
| `com:nationalIdentifier` | 1 |
| `egi:headerInformation` | 1 |
| `com:informationStatus` | 1 |
| `egi:energyInfrastructureTable` | 1 |

#### Valores de ejemplo de etiquetas interesantes

- **com:value**: `IBERDROLA CLIENTES S.A.U` (46), `Comunidad Autónoma: Castilla y León` (14), `Provincia: Málaga` (10), `Comunidad Autónoma: Andalucía` (10), `Municipio: Málaga` (8), `Comunidad Autónoma: Comunitat Valenciana` (7), `Provincia: Valladolid` (7), `Comunidad Autónoma: Cataluña` (6), `Municipio: Murcia` (6), `Provincia: Murcia` (6), `Comunidad Autónoma: Murcia, Región de` (6), `Provincia: Navarra` (6)
- **locx:type**: `generalTextLine` (48584)
- **egi:connectorType**: `iec62196T2` (27554), `iec62196T2COMBO` (10518), `chademo` (3751), `domesticF` (1171), `iec60309x2single16` (106), `iec62196T1` (54), `iec60309x2three32` (25), `iec62196T1COMBO` (7), `domesticE` (7), `domesticA` (6), `iec62196T3A` (4), `iec62196T3C` (1)
- **egi:chargingMode**: `mode3AC3p` (21108), `mode4DC` (14673), `mode2AC1p` (7424)
- **egi:connectorFormat**: `cableMode3` (22929), `socket` (20276)
- **egi:maxPowerAtSocket**: `22000.0` (13542), `50000.0` (6877), `7400.0` (2610), `3600.0` (2226), `22170.0` (2093), `150000.0` (1855), `43650.0` (1103), `100000.0` (1062), `7000.0` (1007), `60000.0` (1006), `7360.0` (949), `43000.0` (770)
- **egi:maximumCurrent**: `32.0` (14638), `0.0` (6678), `125.0` (3112), `16.0` (2001), `400.0` (1290), `11.0` (744), `200.0` (638), `250.0` (583), `63.0` (486), `500.0` (473), `780.0` (468), `150.0` (463)
- **egi:voltage**: `400.0` (9854), `230.0` (8018), `0.0` (6682), `500.0` (2962), `1000.0` (2048), `225.0` (1398), `920.0` (838), `464.0` (478), `800.0` (477), `470.0` (468), `220.0` (402), `420.0` (255)
- **egi:typeOfSite**: `openSpace` (6566), `onstreet` (3220), `other` (663), `inBuilding` (480)
- **fac:serviceFacilityType**: `foodShopping` (409), `restaurant` (268), `leisureActivities` (210), `cafe` (210), `petrolStation` (202), `shop` (198), `hotel` (115), `bikeSharing` (1)
- **fac:type**: `parkingSite` (670), `publicTransportHub` (107), `trainStation` (13), `airport` (12)
- **com:informationStatus**: `real` (1)

#### Ejemplo completo de un sitio (el primero)

```xml
<egi:energyInfrastructureSite id="2023002088" version="">
            <fac:name>
                <com:values>
                    <com:value lang="es">Centro Porsche Baleares CP2</com:value>
                </com:values>
            </fac:name>
            <fac:lastUpdated>2023-11-21T11:39:04.000+01:00</fac:lastUpdated>
            <fac:accessibility xsi:nil="true"/>
            <fac:operatingHours xsi:type="fac:OperatingHoursSpecification" id="Horario habitual" version="">
                <fac:label>Jueves (08:30 - 17:30) Lunes (00:00 - 23:59) Martes (08:30 - 17:30) Miercoles (08:30 - 17:30) Viernes (08:30 - 17:30) Sabado (08:30 - 17:30) Domingo (00:00 - 23:59) </fac:label>
                <fac:overallPeriod>
                    <com:overallStartTime>2023-01-01T00:00:00.000+01:00</com:overallStartTime>
                </fac:overallPeriod>
            </fac:operatingHours>
            <fac:locationReference xsi:type="loc:PointLocation">
                <loc:_locationReferenceExtension>
                    <loc:facilityLocation>
                        <locx:address>
                            <locx:postcode>7011</locx:postcode>
                            <locx:addressLine order="1">
                                <locx:type>generalTextLine</locx:type>
                                <locx:text>
                                    <com:values>
                                        <com:value lang="es">Dirección: Camí dels Reis 166</com:value>
                                    </com:values>
                                </locx:text>
                            </locx:addressLine>
                            <locx:addressLine order="2">
                                <locx:type>generalTextLine</locx:type>
                                <locx:text>
                                    <com:values>
                                        <com:value lang="es">Municipio: Palma</com:value>
                                    </com:values>
                                </locx:text>
                            </locx:addressLine>
                            <locx:addressLine order="3">
                                <locx:type>generalTextLine</locx:type>
                                <locx:text>
                                    <com:values>
                                        <com:value lang="es">Provincia: Balears, Illes</com:value>
                                    </com:values>
                                </locx:text>
                            </locx:addressLine>
                            <locx:addressLine order="4">
                                <locx:type>generalTextLine</locx:type>
                                <locx:text>
                                    <com:values>
                                        <com:value lang="es">Comunidad Autónoma: Balears, Illes</com:value>
                                    </com:values>
                                </locx:text>
                            </locx:addressLine>
                        </locx:address>
                    </loc:facilityLocation>
                </loc:_locationReferenceExtension>
                <loc:coordinatesForDisplay>
                    <loc:latitude>39.5948</loc:latitude>
                    <loc:longitude>2.63586</loc:longitude>
                </loc:coordinatesForDisplay>
            </fac:locationReference>
            <fac:operator xsi:type="fac:OrganisationSpecification" id="ES*915" version="">
                <fac:name>
                    <com:values>
                        <com:value lang="es">Motor Box Mallorca SL</com:value>
                    </com:values>
                </fac:name>
                <fac:organisationUnit/>
            </fac:operator>
            <egi:typeOfSite>other</egi:typeOfSite>
            <egi:energyInfrastructureStation id="2023002088_1" version="">
                <egi:authenticationAndIdentificationMethods>rfid</egi:authenticationAndIdentificationMethods>
                <egi:authenticationAndIdentificationMethods>apps</egi:authenticationAndIdentificationMethods>
                <egi:refillPoint xsi:type="egi:ElectricChargingPoint" id="COD20230000010507PR00000269" version="">
                    <fac:name>
                        <com:values>
                            <com:value lang="es">ES*915*EES00025600000020000001</com:value>
                        </com:values>
                    </fac:name>
                    <egi:connector>
                        <egi:connectorType>iec62196T2COMBO</egi:connectorType>
                        <egi:chargingMode>mode4DC</egi:chargingMode>
                        <egi:connectorFormat>cableMode3</egi:connectorFormat>
                        <egi:maxPowerAtSocket>350000.0</egi:maxPowerAtSocket>
                        <egi:voltage>920.0</egi:voltage>
                        <egi:maximumCurrent>348.0</egi:maximumCurrent>
                    </egi:connector>
                </egi:refillPoint>
            </egi:energyInfrastructureStation>
        </egi:energyInfrastructureSite>
```

#### Otro ejemplo (de la mitad del archivo)

```xml
<egi:energyInfrastructureSite id="2024005564" version="">
            <fac:name>
                <com:values>
                    <com:value lang="es">62225021770003</com:value>
                </com:values>
            </fac:name>
            <fac:lastUpdated>2025-04-23T09:35:26.000+02:00</fac:lastUpdated>
            <fac:accessibility xsi:nil="true"/>
            <fac:operatingHours xsi:type="fac:OperatingHoursSpecification" id="24/7" version="">
                <fac:label>Lunes (00:00 - 00:00) Martes (00:00 - 00:00) Miercoles (00:00 - 00:00) Viernes (00:00 - 00:00) Jueves (00:00 - 00:00) Sabado (00:00 - 00:00) Domingo (00:00 - 00:00) </fac:label>
                <fac:overallPeriod>
                    <com:overallStartTime>2023-01-01T00:00:00.000+01:00</com:overallStartTime>
                </fac:overallPeriod>
            </fac:operatingHours>
            <fac:locationReference xsi:type="loc:PointLocation">
                <loc:_locationReferenceExtension>
                    <loc:facilityLocation>
                        <locx:address>
                            <locx:postcode>31500</locx:postcode>
                            <locx:addressLine order="1">
                                <locx:type>generalTextLine</locx:type>
                                <locx:text>
                                    <com:values>
                                        <com:value lang="es">Dirección: Carretera De Corella, S/N, 31500 Tudela,</com:value>
                                    </com:values>
                                </locx:text>
                            </locx:addressLine>
                            <locx:addressLine order="2">
                                <locx:type>generalTextLine</locx:type>
                                <locx:text>
                                    <com:values>
                                        <com:value lang="es">Municipio: Tudela</com:value>
                                    </com:values>
                                </locx:text>
                            </locx:addressLine>
                            <locx:addressLine order="3">
                                <locx:type>generalTextLine</locx:type>
                                <locx:text>
                                    <com:values>
                                        <com:value lang="es">Provincia: Navarra</com:value>
                                    </com:values>
                                </locx:text>
                            </locx:addressLine>
                            <locx:addressLine order="4">
                                <locx:type>generalTextLine</locx:type>
                                <locx:text>
                                    <com:values>
                                        <com:value lang="es">Comunidad Autónoma: Navarra, Comunidad Foral de</com:value>
                                    </com:values>
                                </locx:text>
                            </locx:addressLine>
                        </locx:address>
                    </loc:facilityLocation>
                </loc:_locationReferenceExtension>
                <loc:coordinatesForDisplay>
                    <loc:latitude>42.059563</loc:latitude>
                    <loc:longitude>-1.630827</loc:longitude>
                </loc:coordinatesForDisplay>
            </fac:locationReference>
            <fac:operator xsi:type="fac:OrganisationSpecification" id="ES*ESX" version="">
                <fac:name>
                    <com:values>
                        <com:value lang="es">ENDESA X WAY, S.L.</com:value>
                    </com:values>
                </fac:name>
                <fac:organisationUnit/>
            </fac:operator>
            <egi:typeOfSite>openSpace</egi:typeOfSite>
            <egi:energyInfrastructureStation id="2024005564_1" version="">
                <egi:authenticationAndIdentificationMethods>rfid</egi:authenticationAndIdentificationMethods>
                <egi:authenticationAndIdentificationMethods>apps</egi:authenticationAndIdentificationMethods>
                <egi:refillPoint xsi:type="egi:ElectricChargingPoint" id="COD20240000042155PR00014300" version="">
                    <fac:name>
                        <com:values>
                            <com:value lang="es">ES*ESX*E622250217700031</com:value>
                        </com:values>
                    </fac:name>
                    <egi:connector>
                        <egi:connectorType>iec62196T2COMBO</egi:connectorType>
                        <egi:chargingMode>mode4DC</egi:chargingMode>
                        <egi:connectorFormat>cableMode3</egi:connectorFormat>
                        <egi:maxPowerAtSocket>50000.0</egi:maxPowerAtSocket>
                        <egi:voltage>0.0</egi:voltage>
                        <egi:maximumCurrent>0.0</egi:maximumCurrent>
                    </egi:connector>
                </egi:refillPoint>
                <egi:refillPoint xsi:type="egi:ElectricChargingPoint" id="COD20240000042156PR00014301" version="">
                    <fac:name>
                        <com:values>
                            <com:value lang="es">ES*ESX*E622250217700032</com:value>
                        </com:values>
                    </fac:name>
                    <egi:connector>
                        <egi:connectorType>chademo</egi:connectorType>
                        <egi:chargingMode>mode4DC</egi:chargingMode>
                        <egi:connectorFormat>cableMode3</egi:connectorFormat>
                        <egi:maxPowerAtSocket>50000.0</egi:maxPowerAtSocket>
                        <egi:voltage>0.0</egi:voltage>
                        <egi:maximumCurrent>0.0</egi:maximumCurrent>
                    </egi:connector>
                </egi:refillPoint>
                <egi:refillPoint xsi:type="egi:ElectricChargingPoint" id="COD20240000042157PR00014302" version="">
                    <fac:name>
                        <com:values>
                            <com:value lang="es">ES*ESX*E622250217700033</com:value>
                        </com:values>
                    </fac:name>
                    <egi:connector>
                        <egi:connectorType>iec62196T2</egi:connectorType>
                        <egi:chargingMode>mode3AC3p</egi:chargingMode>
                        <egi:connectorFormat>socket</egi:connectorFormat>
                        <egi:maxPowerAtSocket>43000.0</egi:maxPowerAtSocket>
                        <egi:voltage>0.0</egi:voltage>
                        <egi:maximumCurrent>0.0</egi:maximumCurrent>
                    </egi:connector>
                </egi:refillPoint>
            </egi:energyInfrastructureStation>
        </egi:energyInfrastructureSite>
```

## Ministerio RIPREE (CSV)

- URL: https://energia.serviciosmin.gob.es/Ripree/ExportarInstalaciones/Export
- Respuesta: HTTP 200 · text/html; charset=utf-8 · intento 2
- Tamaño: 0.01 MB · 2.8 s

#### Etiquetas (de más a menos frecuentes)

| Etiqueta | Veces |
|---|---|
| `div` | 35 |
| `a` | 16 |
| `meta` | 14 |
| `li` | 10 |
| `script` | 9 |
| `span` | 9 |
| `br` | 9 |
| `img` | 4 |
| `link` | 2 |
| `ul` | 2 |
| `html` | 1 |
| `head` | 1 |
| `title` | 1 |
| `body` | 1 |
| `label` | 1 |
| `h1` | 1 |
| `h3` | 1 |
| `button` | 1 |

#### Valores de ejemplo de etiquetas interesantes


#### Inicio del archivo

```xml

<!DOCTYPE html>
<html>
<head>
    <title>Ripree - Exportaci&#243;n p&#250;blica de instalaciones</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="CACHE-CONTROL" content="NO-CACHE" />
    <meta http-equiv="PRAGMA" content="NO-CACHE" />
    <meta http-equiv="Page-Enter" content="blendTrans(Duration=0.5)" />
    <meta http-equiv="Page-Exit" content="blendTrans(Duration=0.5)" />
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <link href="/Ripree/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <!-- CSS -->
    <link href="/Ripree/Content/css?v=GdIYz0yjJE2tneIm51CGXFrVR9dh81JTgb1nKvqDDFM1" rel="stylesheet"/>

    <!-- jQuery -->
    
    <script src="/Ripree/bundles/jquery?v=N2YlHnRI7it2_JoqUZTYWxPtx-s61zIGkk78Q0eabPM1"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/Ripree/bundles/bootstrap?v=bWHga5h0pyUhXqPI6NdlRllSF2pSBl9hzzkSirJz-jU1"></script>

    <!-- Validaciones del cliente -->
    <script src="/Ripree/bundles/jqueryval?v=jTPefzwFx0iM3EsWaYKTfsfd9Bl-EGtCr4NXRQtZFHM1"></script>

    <!-- Máscaras del cliente -->
    <script src="/Ripree/bundles/jquerymaskedinput?v=WKlifDU8tTNmjWsjFSwa8w1t4rl-cCisgbvGXElC6W41"></script>

    <!-- jQuery general para el site -->
    <script src="/Ripree/bundles/site?v=jLq2STyi0D0v7gIT_UH0rCOHCUGZFTj4SKQw4RPX41k1"></script>

    <!-- ComponenteChosen -->
    <script src="/Ripree/bundles/chosen?v=280h9kZgeB1ZXpAAh4kkIX5TRRbYsqiNVot5hFiUI101"></script>

    <!-- Componente czMore -->
    <script src="/Ripree/bundles/czMore?v=rOHIyizCyPDlVUnGzG85G1WMC0zNNEO-R5VdVCx8bTg1"></script>

</head>
<body>
    <!--IDIOMAS-->
    <div class="row row-language">
        <div class="col-lg-12 text-left">

            
        </div>
    </div>

    <!--CABECERA-->
    <div class="container head">
        <div class="head-btn">
            <span class="menu-opener" data-toggle="modal" data-target="#menuModal"></span>
            
        </div>
        <div class="head-logo">
            <a href="https://www.miteco.gob.es">
                <img class="img-responsive" src="https://sedeaplicaciones.minetur.gob.es/EstilosSedeElectronica/SiteCollectionImages/SedeElectronica/mte-gob.png" alt="Ministerio para la Transici&#243;n Ecol&#243;gica">
            </a>
        </div>
        <div class="head-sede">
            <span class="sede">Sede <span>electrónica</span></span>
        </div>
        <div class="head-app">
            <span class="titulo-aplicacion">RIPREE</span>
        </div>
    </div>

    <!--HERRAMIENTAS-->
        <div class="menu">
            <ul class="herramientas">
                <li class="home">
                    <a onmouseover="window.status='Inicio'; return true;" title="Inicio" onkeypress="self.print(); return true;" onclick="comprobarCertificado()" onmouseout="window.status=' '; return true;" href="#">
                        Inicio
                    </a>
                </li>
                <li class="info">
                    <a onmouseover="window.status='Información y ayuda'; return true;" title="Información y ayuda" onkeypress="self.print(); return true;" onclick="window.open('/Ripree/_Layout/Informacion')" onmouseout="window.status=' '; return true;" href="#">
                        Información y ayuda
                    </a>
                </li>
                <li class="print">
                    <a onmouseover="window.status='Imprimir'; return true;" title="Imprimir" onkeypress="javascript:self.print(); return true;" onmouseout="window.status=' '; return true;" onclick="javascript:self.print(); return true;" href="#">
                        Imprimir
                    </a>
                </li>
                <li class="ecofirma">
                    <a onmouseover="window.status='Autofirma'; return true;" title="Autofirma" onmouseout="window.status=' '; return true;" onclick="window.open('http://firmaelectronica.gob.es/Home/Descargas.html');" href="#">
                        Autofirma
                    </a>
                </li>
                <li class="salir">
                    
                    
                    <a id="btnDesconectar" title="Desconectar" onclick="location.href='/Ripree/_Layout/Desconectar'">Desconectar</a>
                </li>
            </ul>
            <div class="tt-usuario">
                    <span id="ctl00_ctl00_LabelLogin">&nbsp;(NoLogin)</span>

            </div>
        </div>
    <!--CUERPO-->
    <div class="container cuerpoPagina">
        <div class="row">

                <div class="menuPrincipal">
                                                                                    <ul class="nav-left" id="side-menu" style="margin-left: 30px">
                            <li><a href="/Ripree/">Control de Acceso</a></li>

                            <li><a href="/Ripree/ExportarEmpresas/Export">Exportaci&#243;n p&#250;blica de empresas</a></li>
                            <li><a href="/Ripree/ExportarInstalaciones/Export">Exportaci&#243;n p&#250;blica de instalaciones</a></li>
                            <li><a href="/Ripree/ApiPublica/Api">Consulta de Api p&#250;blica</a></li>
                            <li><a title="PaginaAyuda" onclick="window.open('https://www.miteco.gob.es/es/energia/hidrocarburos-nuevos-combustibles/sitio-web-de-informacion-al-ciudadano-con-vehiculo-con-motor-ele/ripree.html');" href="#">Informaci&#243;n del procedimiento de remisi&#243;n de informaci&#243;n</a></li>
                        </ul>


                </div>
            <div class="cuerpoPrincipal">
                <div class="row">
                    <div class="migas">
                        <label>Est&#225; en: &nbsp;</label>Exportaci&#243;n p&#250;blica de instalaciones
                    </div>
                </div>
                <div class="row">
                    



    <div>
        <h1>Exportación pública de instalaciones</h1>
        <br />
        <div id="clickInstalacionesCSV" class="label-link"><a href="#">Exportar instalaciones en formato CSV.</a></div>
        <br />
        <br />
        <div id="clickInstalacionesXML" class="label-link"><a href="#">Exportar instalaciones en formato XML.</a></div>
        <br />
        <br />

        <br />
        <br />
    </div>

    <script>

        $('#clickInstalacionesCSV').click(function (e) {

            var model; // Model vacio, sin campos para filtrar
            var soloConsolidado = true; // Para obtener consolidadas

            loader_show("Exportando instalaciones Formato CSV...");

            fetch('../ExportarInstalaciones/GenerarExcel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    soloConsolidado: soloConsolidado
                })
            })
                .then(response => {
                    if (!response.ok) {
                        loader_hide();
                        throw new Error('Error al realizar la peticion.');
                    }
                    const fileName = response.headers.get('Content-Disposition')
                        .split(';')
                        .find(n => n.includes('filename='))
                        .replace('filename=', '')
                        .trim();
                    return response.blob().then(blob => ({ blob, fileName }));
                })
                .then(({ blob, fileName }) => {
                    loader_hide();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                    console.error('Error al realizar la petición:', error);
                    loader_hide();
                    alert("No se ha podido completar la exportación");
                });

            //$.post('../ExportarInstalaciones/GenerarExcel', { model, soloConsolidado: soloConsolidado }, function (result) {
            //    if (result.fileName != null) {
            //        $('#PanelExport').show();
            //        loader_hide();
            //        window.location.href = '../ExportarInstalaciones/DownLoadFile?file=' + result.fileName;
            //    }

            //});
        });

        $('#clickInstalacionesXML').click(function (e) {

            var model; // Model vacio, sin campos para filtrar
            var soloConsolidado = true; // Para obtener consolidadas

            loader_show("Exportando instalaciones Formato XML...");

            fetch('../ExportarInstalaciones/GenerarXml', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    soloConsolidado: soloConsolidado
                })
            })
                .then(response => {
                    if (!response.ok) {
                        loader_hide();
                        throw new Error('Error al realizar la peticion.');
                    }
                    const fileName = response.headers.get('Content-Disposition')
                        .split(';')
                        .find(n => n.includes('filename='))
                        .replace('filename=', '')
                        .trim();
                    return response.blob().then(blob => ({ blob, fileName }));
                })
                .then(({ blob, fileName }) => {
                    loader_hide();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => {
                    console.error('Error al realizar la petición:', error);
                    loader_hide();
                    alert("No se ha podido completar la exportación");
                });

            //$.post('../ExportarInstalaciones/GenerarXml', { model, soloConsolidado: soloConsolidado }, function (result) {
            //    if (result.fileName != null) {
            //        $('#PanelExport').show();
            //        loader_hide();
            //        window.location.href = '../ExportarInstalaciones/DownLoadFile?file=' + result.fileName;
            //    }

            //});
        });

    </script>


                </div>
            </div>
        </div>
    </div>


    <div class="loaderbody hide" id="loaderbody">
        <div class="loader"></div>
        <div class="text">Cargando...</div>
    </div>

    <!--PIE DE PÁGINA-->
    <div id="footer">
        <div class="row">
            <div class="col-lg-12 text-center textoPie">
                Accesibilidad<span class="doble-space" />Aviso legal<span class="doble-space" />Contacto<span class="doble-space" />Política de cookies
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 text-center textoPie">
                Gobierno de Espa&#241;a Ministerio para la Transici&#243;n Ecol&#243;gica.<br />
                <br />
                P. de la Castellana 160, C.P. 28046 Madrid. Espa&#241;a
            </div>
        </div>
        <div class="row col-lg-12 text-center">
            <a href="http://www.w3.org/WAI/WCAG1AA-Conformance">
                <img src="https://sedeaplicaciones.minetur.gob.es/EstilosSedeElectronica/SiteCollectionImages/SedeElectronica/icono3_waiAA.gif"
                     alt="V૩do WAI Doble-A" class="imagenesPie" />
            </a>
            <a href="http://jigsaw.w3.org/css-validator">
                <img src="https://sedeaplicaciones.minetur.gob.es/EstilosSedeElectronica/SiteCollectionImages/SedeElectronica/icono2_css.gif"
                     alt="V૩do CSS 2.1" class="imagenesPie" />
            </a>
            <a href="http://validator.w3.org">
                <img src="https://sedeaplicaciones.minetur.gob.es/EstilosSedeElectronica/SiteCollectionImages/SedeElectronica/icono1_xhtml1.gif"
                     alt="V૩do XHTML 1.0" class="imagenesPie" />
            </a>
        </div>
        <div class="row col-lg-12 text-center">
            <div class="row col-lg-12 text-right">
                Versi&#243;n 13.1.0
            </div>
        </div>

    </div>

    <!--CAPA DE DEGRADADO-->
    

    <!-- MENU MODAL -->
    <div class="modal fade come-from-modal left" id="menuModal" tabindex="-1" role="dialog" aria-labelledby="menuModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="menuModalLabel">
                        Menú
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h3>
                </div>
                <div class="modal-body"></div>
            </div>
        </div>
    </div>

    

    <script>

        function comprobarCertificado() {

            var NoLoging = new Boolean(true);
            if (NoLoging != true) {

                location.href = '/Ripree/Tramites/Consulta';
            }
            else {
                location.href = '/Ripree/';
            }
        }

        function cargarModal() {
            if ($(".modal-body .nav-left").length == 0) {
                var menuPrincipal = document.querySelector('.menuPrincipal');
                $(".modal-
…(recortado)
```
