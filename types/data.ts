interface Location {
	<Type>(arg: Type): Type;
}

export type Data = { species: string; name: string; gender: string; image: string; status: string; location: Location };
