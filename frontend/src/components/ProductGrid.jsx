import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import ProductCard from "./ProductCard"; // Ensure you have a ProductCard component
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";

const ProductGrid = ({ products, setProducts }) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await fetch(BASE_URL + "/products");
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error);
				}
				setProducts(data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		getProducts();
	}, [setProducts]);

	return (
		<>
			<Grid
				templateColumns={{
					base: "1fr",
					md: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
				}}
				gap={4}
			>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} setProducts={setProducts} />
				))}
			</Grid>

			{isLoading && (
				<Flex justifyContent={"center"}>
					<Spinner size={"xl"} />
				</Flex>
			)}
			{!isLoading && products.length === 0 && (
				<Flex justifyContent={"center"}>
					<Text fontSize={"xl"}>
						<Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
							Poor you! 🥺
						</Text>
						No products found.
					</Text>
				</Flex>
			)}
		</>
	);
};

export default ProductGrid;
