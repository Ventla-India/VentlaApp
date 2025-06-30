// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import SQLite from 'react-native-sqlite-storage';
// import jsonData from '../assets/data.json'; // ✅ Adjust path as needed

// SQLite.enablePromise(true);

// type Movie = { name: string; year: string };

// export default function Programs() {
//   const [data, setData] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadJsonToSQLite();
//   }, []);

//   const loadJsonToSQLite = async () => {
//     let db: SQLite.SQLiteDatabase | null = null;

//     try {
//       db = await SQLite.openDatabase({ name: 'movies.db', location: 'default' });

//       await db.executeSql(`
//         CREATE TABLE IF NOT EXISTS Movie (
//           name TEXT NOT NULL,
//           year TEXT
//         );
//       `);

//       const existing = await getMovies(db);
//       if (existing.length > 0) {
//         setData(existing);
//         return;
//       }

//       const insertQuery = 'INSERT INTO Movie (name, year) VALUES (?, ?)';
//       for (const movie of jsonData) {
//         await db.executeSql(insertQuery, [movie.name, movie.year]);
//       }

//       const stored = await getMovies(db);
//       setData(stored);
//     } catch (err) {
//       console.error('❌ Error loading JSON into DB:', err);
//     } finally {
//       setLoading(false);
//       if (db) await db.close();
//     }
//   };

//   const getMovies = async (db: SQLite.SQLiteDatabase): Promise<Movie[]> => {
//     const result = await db.executeSql('SELECT * FROM Movie');
//     const rows = result[0].rows;
//     const list: Movie[] = [];
//     for (let i = 0; i < rows.length; i++) {
//       list.push(rows.item(i));
//     }
//     return list;
//   };

 

//   const renderItem = ({ item, index }: { item: Movie; index: number }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{index + 1}. {item.name}</Text>
//     <Text style={styles.subtitle}>{item.year}</Text>
//   </View>
// );

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={data}
//       keyExtractor={(item, index) => `${item.name}-${index}`}
//       renderItem={renderItem}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
//   title: { fontSize: 16, fontWeight: 'bold' },
//   subtitle: { fontSize: 14, color: '#666' },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });

