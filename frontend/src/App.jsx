import { Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import { useState } from "react";

// Updated this after recording. Make sure you do the same so that it can work in production
export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

function App() {
	const [products, setProducts] = useState([
		{ id: 1, name: "Product 1", description: "Description for product 1", price: 100 },
		{ id: 2, name: "Product 2", description: "Description for product 2", price: 200 },
		{ id: 3, name: "Product 3", description: "Description for product 3", price: 300 }
	]);

	return (
		<Stack minH={"100vh"}>
			<Navbar setProducts={setProducts} />

			<Container maxW={"1200px"} my={4}>
				<Text
					fontSize={{ base: "3xl", md: "50" }}
					fontWeight={"bold"}
					letterSpacing={"2px"}
					textTransform={"uppercase"}
					textAlign={"center"}
					mb={8}
				>
					<Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
						My Products
					</Text>
					🚀
				</Text>

				<ProductGrid products={products} setProducts={setProducts} />
			</Container>
		</Stack>
	);
}

export default App;
